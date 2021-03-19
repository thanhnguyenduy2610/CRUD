import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  // private users: User[] = [
  //   {
  //     id: 1,
  //     Uname: "Mon",
  //     Password: "123",
  //     Role: "Guest"
  //   }
  // ];

 

  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ){}
    
  
  async create(createUserDto: CreateUserDto) {
    const user = this.userRespository.create(createUserDto);

    var userf = null;
    const user1 = await this.userRespository.find();
    user1.forEach(element => {
        if ( user.Uname != element.Uname){
           userf = user;
        } 
        else{
          userf = null;
        }
    });
    if(userf){
      return this.userRespository.save(userf);
    }
    else
    {
      throw new NotAcceptableException(`already have user: ${user.Uname}`);
      // return `already have user: ${user.Uname}`;
    }
    
  }

  findAll() {
    return this.userRespository.find();
  }

  async findOne(id: string) {
    const user = await this.userRespository.findOne(id);
    if(!user){
      throw new NotFoundException(`User ${id} not found`)
    }
    return user;
  }

  async findName(name: string) {
    var userf;
    const user = await this.userRespository.find();
    user.forEach(element => {
        if (name === element.Uname){
           userf = element;
        } 
    });
    return userf;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRespository.preload({
      id: +id,
      ...updateUserDto,
    });
    if (!user){
      throw new NotFoundException(`User ${id} not found!`);
    }
    return this.userRespository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRespository.findOne(id);
    return this.userRespository.remove(user);
  }
}
