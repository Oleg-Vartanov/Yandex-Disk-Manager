<script setup>
import { useAuth } from '../../modules/auth';
import { useFileManager } from '../../modules/file-manager';

const { logout } = useAuth();
const { fileManagerState } = useFileManager();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarTogglerDemo03" class="collapse navbar-collapse">
        <div class="navbar-brand">
          <img
            src="src/assets/images/yandex-logo-white.svg"
            alt="yandex_logo"
          />
        </div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'main' ? 'active' : ''"
              :to="{ name: 'main' }"
              >Main</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name === 'about' ? 'active' : ''"
              :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
        </ul>
        <span class="navbar-text"
          >Welcome, {{ fileManagerState.user.display_name }}!
        </span>
        <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
