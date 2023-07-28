import { Inject, Injectable } from '@nestjs/common';
import { UsuarioEntity } from './entity/usuarioEntity';
import { CacheUsuarioRepository } from 'src/repository/redis/cache-usuario-repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsuarioRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar(): Promise<any> {
    const todosUsuariosDaLista = this.usuarios;
    const usuarioDoCache = await this.cacheManager.set(
      'todosUsuariosDaLista',
      this.usuarios,
      10,
    );
    const buscarRedis = await this.cacheManager.get('todosUsuariosDaLista');

    if (todosUsuariosDaLista) {
      console.log('\x1b[33m%s\x1b[0m', 'Do request', buscarRedis);

      return buscarRedis;
    }

    console.log('\x1b[33m%s\x1b[0m', 'Do rRedis');
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string) {
    const buscarUsuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );
    return buscarUsuario;
  }

  // async create(key: string, value: any, exp?: number) {
  //   const stringValue = JSON.stringify(value);
  //   await this.redis.set(key, stringValue, 'EX', exp);
  // }

  // async findMany(): Promise<UsuarioEntity>[] {
  //   const buscarPorTodosComRedis = this.usuarios.fin
  // };
}
