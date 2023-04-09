import execa from 'execa'
import { createSpinner } from 'nanospinner'
import { resolve } from 'path'

const CWD = process.cwd()
const PKG_UI = resolve(CWD, './packages/varlet-uni-app')
const PKG_SHARED = resolve(CWD, './packages/varlet-shared')
const PKG_USE = resolve(CWD, './packages/varlet-use')

export const buildShared = () => execa('pnpm', ['build'], { cwd: PKG_SHARED })

export const buildUse = () => execa('pnpm', ['build'], { cwd: PKG_USE })

export const buildUI = () => execa('pnpm', ['compile'], { cwd: PKG_UI })

export async function runTask(taskName, task) {
  const s = createSpinner(`Building ${taskName}`).start()
  try {
    await task()
    s.success({ text: `Build ${taskName} completed!` })
  } catch (e) {
    s.error({ text: `Build ${taskName} failed!` })
    console.error(e.toString())
  }
}

export async function runTaskQueue() {
  await runTask('shared', buildShared)
  await runTask('use', buildUse)
  await runTask('ui', buildUI)
}
