interface Props {
  level: number | null
}

export default function LevelStars({ level }: Props) {
  if (!level) return <span className="text-xs text-gray-400">--</span>

  return (
    <span className="text-yellow-400 text-sm leading-none" title={`难度 ${level}/5`}>
      {'★'.repeat(level)}
      <span className="text-gray-200">{'★'.repeat(5 - level)}</span>
    </span>
  )
}
