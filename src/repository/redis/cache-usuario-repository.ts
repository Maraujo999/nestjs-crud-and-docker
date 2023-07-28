import { UsuarioRepository } from 'src/usuario/usuario.repository';

export abstract class MainUserRepository extends UsuarioRepository {}

export abstract class CacheUsuarioRepository extends UsuarioRepository {
  abstract create(key: string, value: any, exp?: number): Promise<void>;
}
