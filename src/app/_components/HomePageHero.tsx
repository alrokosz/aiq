type HeroText = {
  Welcome: 'delay-100'
  To: 'delay-300'
  AIQ: 'delay-500'
}

const heroText: HeroText = {
  Welcome: 'delay-100',
  To: 'delay-300',
  AIQ: 'delay-500',
}

export default function HomePageHero() {
  return (
    <div className="bg-bg-main flex h-72 items-center justify-center">
      <h1 className="text-text-main text-5xl">
        {Object.keys(heroText).map((el, i) => {
          return (
            <span
              key={`hero-${el}`}
              className={`animate-hero-enter ${heroText[el as keyof HeroText]}`}
            >
              {el}{' '}
            </span>
          )
        })}
      </h1>
    </div>
  )
}
