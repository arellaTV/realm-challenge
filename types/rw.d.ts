import { AppContext } from '../src/worker'

declare module 'rwsdk/worker' {
  interface DefaultAppContext extends AppContext {} // eslint-disable-line @typescript-eslint/no-empty-object-type
}
