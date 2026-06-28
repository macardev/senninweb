function QuoteMark() {
  return (
    <svg
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="none"
      className="text-gold-500/30"
      aria-hidden="true"
    >
      <path
        d="M19.2 0C12.8 0 7.2 2.4 3.2 7.2a15.8 15.8 0 0 0-3.2 9.6c0 2.13.53 4 1.6 5.6 1.07 1.6 2.4 2.93 4 4a15.85 15.85 0 0 0 5.6 2.4 8.45 8.45 0 0 1-2.4-3.2 10.41 10.41 0 0 1-.8-4c0-3.2 1.07-5.87 3.2-8 2.13-2.13 4.8-3.2 8-3.2V0Zm24 0c-6.4 0-12 2.4-16 7.2a15.8 15.8 0 0 0-3.2 9.6c0 2.13.53 4 1.6 5.6 1.07 1.6 2.4 2.93 4 4a15.85 15.85 0 0 0 5.6 2.4 8.45 8.45 0 0 1-2.4-3.2 10.41 10.41 0 0 1-.8-4c0-3.2 1.07-5.87 3.2-8 2.13-2.13 4.8-3.2 8-3.2V0Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Avatar({ initials }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                 border border-gold-500/30 bg-gold-500/10"
      aria-hidden="true"
    >
      <span className="text-sm font-semibold text-gold-400 tracking-wide">
        {initials}
      </span>
    </div>
  )
}

export default function TestimonialCard({ quote, author, initials, company }) {
  return (
    <div
      className="relative p-10 md:p-14 rounded-2xl text-center
                 border border-white/6 bg-white/[0.02]"
    >
      <span className="absolute top-6 left-6 md:top-8 md:left-8 opacity-40">
        <QuoteMark />
      </span>

      <blockquote className="relative z-10">
        <p className="text-xl md:text-2xl lg:text-3xl text-white/85 font-medium leading-relaxed tracking-tight mb-10 md:mb-12">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      <div className="w-16 h-px bg-gold-500/50 mx-auto mb-10" />

      <div className="flex items-center justify-center gap-4">
        <Avatar initials={initials} />
        <div className="text-left">
          <p className="text-sm font-semibold text-white tracking-tight">
            {author}
          </p>
          {company && (
            <p className="text-xs text-white/60 mt-0.5">{company}</p>
          )}
        </div>
      </div>
    </div>
  )
}
