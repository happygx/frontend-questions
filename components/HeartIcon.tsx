/**
 * 简洁心形路径（Heroicons v1 几何），避免 v2 实心路径在缩小后底部出现多余像素/重影。
 */
const HEART_PATH =
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"

export function HeartFilled({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={HEART_PATH} />
    </svg>
  )
}

export function HeartOutline({
  className,
  strokeWidth = 1.75,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        d={HEART_PATH}
      />
    </svg>
  )
}
