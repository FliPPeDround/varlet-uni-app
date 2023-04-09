import { watch, onBeforeMount, onUnmounted, onDeactivated, onActivated, getCurrentInstance } from 'vue';
import context from './index.mjs';
export function resolveLock() {
  var lockCounts = Object.keys(context.locks).length;
  lockCounts <= 0 ? document.body.classList.remove('var--lock') : document.body.classList.add('var--lock');
}
export function addLock(uid) {
  context.locks[uid] = 1;
  resolveLock();
}
export function releaseLock(uid) {
  delete context.locks[uid];
  resolveLock();
}
export function useLock(source, useSource) {
  var {
    uid
  } = getCurrentInstance();
  if (useSource) {
    watch(useSource, newValue => {
      if (newValue === false) {
        // 改变为禁用状态 组件解锁
        releaseLock(uid);
      } else if (newValue === true && source() === true) {
        // 改变为启用状态 并且popup处于开启状态 组件加锁
        addLock(uid);
      }
    });
  }
  watch(source, newValue => {
    if (useSource && useSource() === false) {
      return;
    }
    if (newValue === true) {
      // popup开启 组件加锁
      addLock(uid);
    } else {
      // popup关闭 组件解锁
      releaseLock(uid);
    }
  });
  onBeforeMount(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      // popup处于开启状态 组件挂载 组件加锁
      addLock(uid);
    }
  });
  onUnmounted(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      // popup处于开启状态 组件卸载 组件解锁
      releaseLock(uid);
    }
  });
  onActivated(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      // popup处于开启状态 组件处于keepalive前台 组件加锁
      addLock(uid);
    }
  });
  onDeactivated(() => {
    if (useSource && useSource() === false) {
      return;
    }
    if (source() === true) {
      // popup处于开启状态 组件处于keepalive后台 组件解锁
      releaseLock(uid);
    }
  });
}