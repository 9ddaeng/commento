export interface Board {
  id: string;
  title: string;
  description: string;

  // 이 게시물이 공개 게시물인지 비공개 게시물인지를 표시한다.
  // 두가지 상태 이외에는 나오면 안되기 때문에 타입스크립트의 기능인 enumeration을 이용한다.
  status: BoardStatus
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'

}


