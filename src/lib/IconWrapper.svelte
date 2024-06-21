<!-- IconWrapper.svelte -->
<div class="icon-wrapper">
    <slot></slot>
  </div>
  
  <style>
    .icon-wrapper {
      display: inline-block;
    }
  
    .icon-wrapper:hover {
      transform: scale(1.2);
      transition: transform 0.2s ease-out;
    }
  </style>
  