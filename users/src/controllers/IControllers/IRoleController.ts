import { Request, Response, NextFunction } from 'express';

export default interface IRoleController  {
  listRoles(req: Request, res: Response, next: NextFunction);
  createRole(req: Request, res: Response, next: NextFunction);
  updateRole(req: Request, res: Response, next: NextFunction);
}
