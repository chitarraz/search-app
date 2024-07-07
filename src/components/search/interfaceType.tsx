export interface DocumentObject {
  Text: string,
  Highlights: {BeginOffset: number, EndOffset: number}[],
}

export interface SearchItem {
  DocumentTitle: DocumentObject,
  DocumentExcerpt: DocumentObject,
  DocumentURI: string,
}