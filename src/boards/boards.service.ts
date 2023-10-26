import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: BoardRepository
  ) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   //const title = createBoardDto.title;
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     // title: title == title
  //     description,
  //     status: BoardStatus.PUBLIC
  //   }

  //   this.boards.push(board)
  //   return board;
  // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
      const {title, description} = createBoardDto;

      const board = this.boardRepository.create({
        title,
        description,
        status: BoardStatus.PUBLIC
      })

      await this.boardRepository.save(board);

      return board;
    }

    async getBoardById(id: number): Promise <Board> {
      
      const found = await this.boardRepository.findOne({
        where: {
          id,
        },
      });

      if(!found) {
        throw new NotFoundException(`can't find board with ${id}`);
      }

      return found;
    }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id)

  //   if(!found) {
  //     throw new NotFoundException(`Can't find Board with ${id}`);
  //   }

  //   return found;

  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);

  //   // id가 같은 것만 남겨준다. -> id가 일치하는 게시글을 삭제한다.
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);

  //   board.status = status;
  //   return board;
  // }

}
