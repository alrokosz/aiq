export function convertBytes(bytes: number) {
  if (!bytes) return null
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`
}

export function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}

interface Flashcard {
  repetitions: number
  interval: number
  easeFactor: number
  nextReview: Date
}

export function updateFlashcard(
  rating: number,
  flashcard: Flashcard,
): Flashcard {
  let { repetitions, interval, easeFactor, nextReview } = flashcard

  if (rating >= 3) {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  } else {
    interval = 1
    repetitions = 0
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
  if (easeFactor < 1.3) {
    easeFactor = 1.3
  }

  // Calculate next review date
  nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return { repetitions, interval, easeFactor, nextReview }
}
