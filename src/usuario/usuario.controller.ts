import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
  ApiSecurity,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CriaUsuarioDto } from './dto/criaUsuarioDto';
import { v4 as uuid } from 'uuid';
import { UsuarioEntity } from './entity/usuarioEntity';
import { ListaUsuarioDto } from './dto/listaUsuarioDto';
import { AtualizarDadosCadastraisDto } from './dto/atualizarDadosCadastraisDto';
import { UsuarioService } from './usuario.service';

// eslint-disable-next-line prettier/prettier
@ApiTags('usuarios')
@ApiBearerAuth()
@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService,
  ) {}

  @Post()
  @ApiBody({ type: [CriaUsuarioDto] })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UsuarioEntity,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async criarUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.password = dadosDoUsuario.password;
    usuarioEntity.id = '1234';

    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuario cadastrado com sucesso',
    };
    //return {status: 'usuario criado!'};
  }

  @Get()
  // @ApiSecurity('bearer')
  // @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  // @ApiSecurity('bearer')
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Bearer token',
  //   required: true,
  // })
  @ApiBearerAuth('JWT-auth')
  async listUsuarios(): Promise<any> {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuarios) => new ListaUsuarioDto(usuarios.id, usuarios.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosAtualizado: AtualizarDadosCadastraisDto,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      dadosAtualizado,
    );
    return {
      usuario: usuarioAtualizado,
      messagem: 'Usuário a  tualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletarUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioDeletado,
      message: 'Usuário removido com sucesso',
    };
  }

  @Post('/user')
  create(@Body() usuarioDto: CriaUsuarioDto) {
    return this.usuarioService.create(usuarioDto);
    //return this.usuarioService.findByEmail('Aoi@aoi.com.br')
    //
  }

  //  @Get('/usuariosRedis')
  //  async obterListaDeUsuarioRedis(): Promise<UsuarioEntity> {
  //    return await this.usuarioService.getUsers();
  //  }
}
