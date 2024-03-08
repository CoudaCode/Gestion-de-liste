export const inProduction:boolean = process.env.NODE_ENV === 'production'
export const apiUrl = inProduction ? '' : 'http://localhost:3000';