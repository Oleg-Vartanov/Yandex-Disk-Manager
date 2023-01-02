<script setup lang="ts">
import { useError } from '../../modules/error';

const { errorState } = useError();
</script>

<template>
  <div
    v-if="errorState.topError.isError"
    class="alert alert-dismissible fade show"
    :class="'alert-' + errorState.topError.type"
    role="alert"
  >
    {{ errorState.topError.message }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>
