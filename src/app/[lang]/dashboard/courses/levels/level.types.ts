export type LevelType = {
  id: string
  name: 'A1/A2' | 'B1/B2' | 'C1/C2'
}

export type LevelsResType = {
  success: true
  count: number
  courses: LevelType[]
}
