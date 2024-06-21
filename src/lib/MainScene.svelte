<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
  
    let canvas: HTMLCanvasElement;
  
    onMount(() => {
      // Set up the scene
      const scene = new THREE.Scene();
  
      // Set up the camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
  
      // Set up the renderer
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  
      // Add a cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      // Animation loop
      const animate = function () {
        requestAnimationFrame(animate);
  
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        renderer.render(scene, camera);
      };
  
      animate();
  
      // Handle window resize
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onWindowResize);
  
      return () => {
        window.removeEventListener("resize", onWindowResize);
      };
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>
  
  <style>
    canvas {
      display: block;
    }
  </style>
  