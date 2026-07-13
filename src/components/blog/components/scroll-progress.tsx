"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

export type ScrollProgressSection = {
  id: string;
  label: string;
  /** Nesting level, 0 = top-level. Omit for a flat list. */
  depth?: number;
};

export type ScrollProgressProps = React.ComponentProps<"div"> & {
  /** Headings to track, in document order. `sections[0]` is the default active one. */
  sections?: ScrollProgressSection[];
  /** Pass this when scroll-spy should track a scrollable container instead of the window. */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Distance (px) from the top of the scroll viewport that counts as "reached" a heading. */
  offset?: number;
  /** Max height (px) of the expanded section list before it scrolls internally. */
  maxListHeight?: number;
};

// ---------------------------------------------------------------------------
// animation / layout constants
// ---------------------------------------------------------------------------

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const SIZE_SPRING = { type: "spring", bounce: 0.16, duration: 0.5 } as const;
const LABEL_CROSSFADE = { duration: 0.22, ease: EASE_OUT } as const;
const ICON_CROSSFADE = { duration: 0.22, ease: EASE_OUT } as const;
const LAYER_FADE = { duration: 0.24, ease: EASE_IN_OUT } as const;

const OPEN_PANEL_RADIUS = 26;
const DEFAULT_MAX_LIST_HEIGHT = 320;
const INDENT_BASE_PX = 12;
const INDENT_STEP_PX = 16;

/** Scroll progress (0–1) above which the pill treats you as "at the end" and swaps to a back-to-top button. */
const AT_END_THRESHOLD = 0.98;

/**
 * How long (ms) we ignore scroll-driven "active section" updates after a click
 * or "back to top". Without this, the smooth-scroll animation glides past
 * intermediate headings and the scroll listener "corrects" activeId mid-flight.
 */
const CLICK_SCROLL_LOCK_MS = 700;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const thinScrollbar =
  "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent " +
  "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/15 " +
  "hover:[&::-webkit-scrollbar-thumb]:bg-foreground/25";

// ---------------------------------------------------------------------------
// hooks
// ---------------------------------------------------------------------------

type Size = { width: number; height: number };

/** Measures an element's rendered size and re-measures on content/font/resize changes. */
function useElementSize<T extends HTMLElement>(deps: React.DependencyList) {
  const ref = React.useRef<T>(null);
  const [size, setSize] = React.useState<Size>();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () =>
      setSize({ width: el.offsetWidth, height: el.offsetHeight });

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
    // deps are caller-controlled (e.g. [sections]) — el/measure are stable per-mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [ref, size] as const;
}

/**
 * Scroll-spy: tracks which section has scrolled past the anchor line, and
 * exposes `jumpToSection` / `scrollToTop` actions that temporarily lock out
 * the scroll listener so it doesn't fight the smooth-scroll animation.
 */
function useActiveSection(
  sections: ScrollProgressSection[],
  containerRef: React.RefObject<HTMLElement | null> | undefined,
  offset: number,
) {
  const [activeId, setActiveId] = React.useState(sections[0]?.id);
  const lockedRef = React.useRef(false);
  const lockTimerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  useIsomorphicLayoutEffect(() => {
    const scroller: Window | HTMLElement = containerRef?.current ?? window;

    const update = () => {
      if (lockedRef.current) return;

      const anchor =
        (containerRef?.current?.getBoundingClientRect().top ?? 0) + offset;

      const active = sections.findLast(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        return top !== undefined && top <= anchor;
      });

      setActiveId(active?.id ?? sections[0]?.id);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections, containerRef, offset]);

  React.useEffect(() => () => clearTimeout(lockTimerRef.current), []);

  const withLock = React.useCallback((action: () => void, smooth: boolean) => {
    lockedRef.current = true;
    clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(
      () => {
        lockedRef.current = false;
      },
      smooth ? CLICK_SCROLL_LOCK_MS : 0,
    );
    action();
  }, []);

  const jumpToSection = React.useCallback(
    (id: string, smooth: boolean) => {
      withLock(() => {
        setActiveId(id);
        document.getElementById(id)?.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "start",
        });
      }, smooth);
    },
    [withLock],
  );

  const scrollToTop = React.useCallback(
    (smooth: boolean) => {
      withLock(() => {
        setActiveId(sections[0]?.id);
        const scroller: Window | HTMLElement = containerRef?.current ?? window;
        scroller.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      }, smooth);
    },
    [withLock, sections, containerRef],
  );

  return [activeId, jumpToSection, scrollToTop] as const;
}

// ---------------------------------------------------------------------------
// component
// ---------------------------------------------------------------------------

const ScrollProgress = ({
  className,
  sections = [],
  containerRef,
  offset = 120,
  maxListHeight = DEFAULT_MAX_LIST_HEIGHT,
  ...props
}: ScrollProgressProps) => {
  const layoutId = React.useId();
  const listId = React.useId();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined,
  );
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Raw (unspringed) progress drives the "at end" check, so the icon swap
  // lands the instant you actually hit the bottom rather than trailing the spring.
  const [isAtEnd, setIsAtEnd] = React.useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsAtEnd(v >= AT_END_THRESHOLD);
  });

  const [activeId, jumpToSection, scrollToTop] = useActiveSection(
    sections,
    containerRef,
    offset,
  );
  const [open, setOpen] = React.useState(false);
  const sectionLabel = sections.find((s) => s.id === activeId)?.label;

  // What the pill actually displays right now. Single source of truth for
  // both the visible text AND its AnimatePresence key, so the crossfade
  // identity always matches what's on screen (fixes the old bug where the
  // key was tied to `label` while the text shown could be "Back to Top").
  const displayText = isAtEnd ? "Back to Top" : sectionLabel;

  // Any nested item present → indentation-only style (no dots), matching a
  // hierarchical TOC. Flat lists keep the dot indicator.
  const isHierarchical = sections.some((s) => (s.depth ?? 0) > 0);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const [labelRef, labelSize] = useElementSize<HTMLSpanElement>([displayText]);
  const [collapsedRef, collapsedSize] = useElementSize<HTMLDivElement>([
    sections,
  ]);
  const [listRef, listSize] = useElementSize<HTMLDivElement>([sections]);

  // Close on outside click / Escape, restoring focus to the toggle.
  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Send focus into the list when it opens, landing on the active section.
  React.useEffect(() => {
    if (!open) return;
    const activeIndex = Math.max(
      sections.findIndex((s) => s.id === activeId),
      0,
    );
    itemRefs.current[activeIndex]?.focus();
    // Only when `open` flips to true.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const selectSection = (id: string) => {
    jumpToSection(id, !reduceMotion);
    setOpen(false);
    toggleButtonRef.current?.focus();
  };

  // Collapsed-pill click: at the end of the page it's a direct "back to top"
  // action; otherwise it opens the section list as normal.
  const handlePillClick = () => {
    if (isAtEnd) {
      // Optimistic reset — don't wait for the real scroll position to trickle
      // back down past AT_END_THRESHOLD. That round trip through actual
      // scroll events is what made the circle/icon feel like it "stuck" at
      // the end instead of resetting the moment you clicked.
      setIsAtEnd(false);
      progress.jump(0); // instantly zero the ring; spring re-engages naturally
      // as real scroll events arrive during the smooth scroll
      scrollToTop(!reduceMotion);
    } else {
      setOpen(true);
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    const lastIndex = sections.length - 1;
    const focusIndex = (i: number) => {
      const el = itemRefs.current[i];
      el?.focus();
      el?.scrollIntoView({ block: "nearest" });
    };

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusIndex(index === lastIndex ? 0 : index + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusIndex(index === 0 ? lastIndex : index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(lastIndex);
        break;
    }
  };

  // Nothing to show/track — bail after hooks have run, not before.
  if (sections.length === 0) return null;

  const listNaturalHeight = listSize?.height ?? 0;
  const listDisplayHeight = Math.min(listNaturalHeight, maxListHeight);
  const needsScroll = listNaturalHeight > maxListHeight;

  const size = open
    ? listSize
      ? { width: listSize.width, height: listDisplayHeight }
      : undefined
    : collapsedSize;

  const radius = open ? OPEN_PANEL_RADIUS : (collapsedSize?.height ?? 32) / 2;
  const squircle = "[corner-shape:squircle]";

  return (
    <div
      ref={rootRef}
      data-slot="scroll-progress"
      role="navigation"
      aria-label="Table of contents"
      className={cn("fixed bottom-6 left-1/2 z-50 -translate-x-1/2", className)}
      {...props}
    >
      {/* Hidden clones used only to measure natural sizes. Must mirror the
          real markup's classes exactly, or measured sizes drift from rendered ones. */}
      <div className="pointer-events-none invisible absolute" aria-hidden>
        <div
          ref={collapsedRef}
          className="inline-flex items-center gap-2.5 py-1.5 pl-2 pr-4"
        >
          <span className="h-5 w-5" />
          <span
            ref={labelRef}
            className="whitespace-nowrap text-sm font-medium leading-none"
          >
            {displayText}
          </span>
        </div>

        <div ref={listRef} className="w-max p-1.5">
          {sections.map((s) => (
            <div
              key={s.id}
              style={{
                paddingLeft: INDENT_BASE_PX + (s.depth ?? 0) * INDENT_STEP_PX,
              }}
              className="flex items-center gap-3 py-2 pr-3 text-sm font-medium leading-none"
            >
              {!isHierarchical && <span className="h-1.5 w-1.5 shrink-0" />}
              <span className="whitespace-nowrap">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {size && (
        <motion.div
          data-slot="scroll-progress-surface"
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden border border-border/60 bg-background/70 shadow-lg backdrop-blur-md",
            squircle,
          )}
          initial={false}
          animate={{
            width: size.width,
            height: size.height,
            borderRadius: radius,
          }}
          transition={reduceMotion ? { duration: 0 } : SIZE_SPRING}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {open ? (
              <motion.ul
                key="list"
                id={listId}
                role="list"
                style={{ height: listDisplayHeight }}
                className={cn(
                  "absolute inset-0 flex flex-col overflow-y-auto overscroll-contain p-1.5",
                  thinScrollbar,
                )}
                initial={{
                  opacity: 0,
                  filter: reduceMotion ? undefined : "blur(4px)",
                }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  filter: reduceMotion ? undefined : "blur(4px)",
                }}
                transition={LAYER_FADE}
              >
                {sections.map((s, i) => {
                  const isActive = s.id === activeId;
                  return (
                    <li key={s.id}>
                      <button
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        type="button"
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => selectSection(s.id)}
                        onKeyDown={(e) => handleItemKeyDown(e, i)}
                        style={{
                          paddingLeft:
                            INDENT_BASE_PX + (s.depth ?? 0) * INDENT_STEP_PX,
                        }}
                        className={cn(
                          "relative flex w-full items-center gap-3 rounded-[14px] py-2 pr-3 text-left text-sm font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40",
                          squircle,
                          isActive
                            ? "text-foreground"
                            : "text-foreground/55 hover:text-foreground/80",
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId={`${layoutId}-active`}
                            className={cn(
                              "absolute inset-0 rounded-[14px] bg-foreground/10",
                              squircle,
                            )}
                            transition={
                              reduceMotion ? { duration: 0 } : SIZE_SPRING
                            }
                          />
                        )}
                        {!isHierarchical && (
                          <motion.span
                            className={cn(
                              "relative h-1.5 w-1.5 shrink-0 rounded-full",
                              isActive ? "bg-foreground" : "bg-foreground/30",
                            )}
                            initial={
                              reduceMotion
                                ? undefined
                                : { opacity: 0, y: 4, filter: "blur(3px)" }
                            }
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              duration: 0.3,
                              ease: EASE_IN_OUT,
                              delay: reduceMotion ? 0 : 0.04 + i * 0.03,
                            }}
                          />
                        )}
                        <motion.span
                          className="relative whitespace-nowrap"
                          initial={
                            reduceMotion
                              ? undefined
                              : { opacity: 0, y: 4, filter: "blur(3px)" }
                          }
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.3,
                            ease: EASE_IN_OUT,
                            delay: reduceMotion ? 0 : 0.04 + i * 0.03,
                          }}
                        >
                          {s.label}
                        </motion.span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            ) : (
              <motion.button
                key="pill"
                ref={toggleButtonRef}
                type="button"
                aria-expanded={open}
                aria-controls={listId}
                aria-label={
                  isAtEnd
                    ? "Back to top"
                    : sectionLabel
                      ? `Currently reading: ${sectionLabel}. Show all sections`
                      : "Show sections"
                }
                onClick={handlePillClick}
                className="absolute inset-0 flex items-center gap-2.5 py-1.5 pl-2 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                initial={{
                  opacity: 0,
                  filter: reduceMotion ? undefined : "blur(4px)",
                }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  filter: reduceMotion ? undefined : "blur(4px)",
                }}
                transition={LAYER_FADE}
              >
                <span className="relative h-5 w-5 shrink-0">
                  <AnimatePresence initial={false} mode="wait">
                    {isAtEnd ? (
                      <motion.span
                        key="arrow"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{
                          opacity: 0,
                          filter: reduceMotion ? undefined : "blur(2px)",
                        }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{
                          opacity: 0,
                          filter: reduceMotion ? undefined : "blur(2px)",
                        }}
                        transition={ICON_CROSSFADE}
                      >
                        <ArrowUp className="h-4 w-4 text-foreground" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="ring"
                        className="absolute inset-0"
                        initial={{
                          opacity: 0,
                          filter: reduceMotion ? undefined : "blur(2px)",
                        }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{
                          opacity: 0,
                          filter: reduceMotion ? undefined : "blur(2px)",
                        }}
                        transition={ICON_CROSSFADE}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 -rotate-90"
                          aria-hidden
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="2.5"
                            className="stroke-foreground/15"
                          />
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="stroke-foreground"
                            style={{ pathLength: progress }}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                <span
                  className="relative h-5 shrink-0"
                  style={{ width: labelSize?.width }}
                >
                  <AnimatePresence initial={false}>
                    {displayText && (
                      <motion.span
                        key={displayText}
                        data-slot="scroll-progress-label"
                        className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-sm font-medium leading-none text-foreground"
                        initial={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, filter: "blur(1.5px)" }
                        }
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, filter: "blur(1.5px)" }
                        }
                        transition={LABEL_CROSSFADE}
                      >
                        {displayText}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

ScrollProgress.displayName = "ScrollProgress";

export { ScrollProgress };
export default ScrollProgress;
