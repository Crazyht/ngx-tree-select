import { FS_REF, root } from './fs';

export type HOOKS = 'rollupUMD' | 'rollupFESM' | 'packageJSON' | 'tsconfig' | 'jestConfig';
const constraints: { [hook: string]: 'global' | 'local' } = {
  jestConfig: 'global'
};

const runHook = (hookScope: 'global' | 'local', hookName: HOOKS, hookArgs: any[], path: string) => {
  if (!constraints[hookName] || constraints[hookName] === hookScope) {
    // tslint:disable-next-line:max-line-length
    const logPrefix = `[${new Date().toTimeString().split(' ')[0]}]   ${hookScope === 'global' ? 'Root ' : 'Local'} : `;
    try {
      const moduleId = require.resolve(path);

      try {
        const module = require(moduleId);
        if (typeof module[hookName] === 'function') {
          module[hookName](...hookArgs);
          console.log(`${logPrefix}Hook for ${hookName} applied`);
        }
      } catch (err) {
        // tslint:disable-next-line:max-line-length
        console.log(`${logPrefix}Hook for ${hookName} cannot be applied, probably caused by a syntax error.${err}`);
      }
    } catch (err) {
      // tslint:disable-next-line:max-line-length
      console.log(`${logPrefix}Hook for ${hookName} cannot be applied, probably caused by no specific hooks.${err}`);
     }
  }
};

export function tryRunHook(pkgDir: string,
                           hookName: HOOKS,
                           ...args: any[]): void {

  runHook('global', hookName, args, root('build_hooks'));
  runHook('local', hookName, args, root(FS_REF.SRC_CONTAINER, pkgDir, 'build_hooks'));
}
