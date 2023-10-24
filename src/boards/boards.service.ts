import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // 다른 컴포넌트에서 boards의 값을 수정할 수 없도록 private으로 제한자를 설정해준다.
  private boards: Board[]  = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    //const title = createBoardDto.title;
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      // title: title == title
      description,
      status: BoardStatus.PUBLIC
    }

    this.boards.push(board)
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id)
  }

  deleteBoard(id: string): void {
    // id가 같은 것만 남겨준다. -> id가 일치하는 게시글을 삭제한다.
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);

    board.status = status;
    return board;
  }

}
