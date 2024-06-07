import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * this function is used to create User in User Entity.
   * @param createUserDto this with type of createUserDto in which
   * we have defined are the keys we are expecting from body
   * @returns promise of user
   */
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;

    return this.userRepository.save(user);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * this function is used to update specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represents the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of updated user
   */
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();

    user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.gender = updateUserDto.gender;
    user.password = updateUserDto.password;
    user.id = id;
    user.age = updateUserDto.age;

    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
