import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../utilities/themeContext';

/**
 * Lightweight interactive Three.js 3D architectural vault & prismatic canopy scene
 * responding gently to pointer movement across X/Y axes.
 */
export function AtriumAmbientCanvas({ activeCategoryId = 'fashion' }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDisposed = false;
    let rafId = null;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const width = canvas.clientWidth || 640;
    const height = canvas.clientHeight || 420;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 12.5);

    const isDark = theme === 'dark';
    const accentMap = {
      fashion: isDark ? 0xbfa1ff : 0x8b5cf6,
      footwear: isDark ? 0x5eead4 : 0x0d9488,
      jewellery: isDark ? 0xf0b97a : 0xd97706,
      beauty: isDark ? 0xf48c74 : 0xe11d48,
      supermarket: isDark ? 0x6ee7b7 : 0x059669,
      cinema: isDark ? 0x93c5fd : 0x2563eb,
      dining: isDark ? 0xfdba74 : 0xea580c,
    };

    const accentHex = accentMap[activeCategoryId] || (isDark ? 0xbfa1ff : 0x8b5cf6);

    const hemi = new THREE.HemisphereLight(
      isDark ? 0xd8cee9 : 0xfff8f1,
      isDark ? 0x1d1630 : 0xdcc7f5,
      1.35
    );
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(isDark ? 0xf48c74 : 0xffffff, 1.5);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const archGroup = new THREE.Group();
    scene.add(archGroup);

    const archGeo = new THREE.TorusGeometry(3.8, 0.08, 12, 48, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      roughness: 0.25,
      metalness: 0.72,
    });

    const archCount = 9;
    const archInst = new THREE.InstancedMesh(archGeo, archMat, archCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < archCount; i++) {
      dummy.position.set(0, -1.4, 3 - i * 1.4);
      dummy.scale.setScalar(1 - i * 0.035);
      dummy.updateMatrix();
      archInst.setMatrixAt(i, dummy.matrix);
    }
    archInst.computeBoundingSphere();
    archGroup.add(archInst);

    const ringGeo = new THREE.TorusGeometry(1.75, 0.12, 16, 56);
    const ringMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xf48c74 : 0xc9523c,
      roughness: 0.2,
      metalness: 0.85,
    });
    const centerRing = new THREE.Mesh(ringGeo, ringMat);
    centerRing.position.set(0, 0.5, 0.2);
    archGroup.add(centerRing);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver((entries) => {
            const rect = entries[0]?.contentRect;
            if (!rect || !rect.width || !rect.height || isDisposed) return;
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height, false);
          })
        : null;

    resizeObserver?.observe(canvas);

    const animate = () => {
      if (isDisposed) return;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      archGroup.rotation.y = currentX * 0.32;
      archGroup.rotation.x = currentY * 0.16;
      centerRing.rotation.x = currentY * 0.45;
      centerRing.rotation.y = currentX * 0.65;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver?.disconnect();
      archGeo.dispose();
      archMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [activeCategoryId, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full block pointer-events-none"
    />
  );
}
