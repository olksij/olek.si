// this file is intended to enable typescript support 
// for parcel's named pipelines feature

declare module 'data-url:*' {
  const src: string
  export default src
}
declare module 'bundle-text:*' {
  const src: string
  export default src
}
