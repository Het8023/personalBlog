<script setup>
import { RouterView } from "vue-router";
import { onMounted, provide, ref, watch } from "vue";
// import * as THREE from "three";
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import Nav from "@/components/home/nav.vue";
const canvas = ref(null);
const start = ref(null);

const toggle = ref(false);
provide("toggle", toggle);
let scene, camera, renderer, rotationProgress;

const initParticles = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.value.clientWidth / canvas.value.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
    start.value.appendChild(renderer.domElement);

    // 创建粒子系统
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x3498db,
        transparent: true,
        // opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    // 动画循环
    function animate() {
        rotationProgress = requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }

    animate();

    // 响应窗口大小变化
    window.addEventListener("resize", () => {
        camera.aspect = canvas.value.clientWidth / canvas.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
    });
};

const initDx = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x160016);
    camera = new THREE.PerspectiveCamera(60, canvas.value.clientWidth / canvas.value.clientHeight, 1, 1000);
    camera.position.set(0, 4, 21);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
    start.value.appendChild(renderer.domElement);
    window.addEventListener("resize", (event) => {
        camera.aspect = canvas.value.clientWidth / canvas.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
    });

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;

    let gu = {
        time: { value: 0 },
    };

    let sizes = [];
    let shift = [];
    let pushShift = () => {
        shift.push(
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2,
            (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
            Math.random() * 0.9 + 0.1
        );
    };
    let pts = new Array(50000).fill().map((p) => {
        sizes.push(Math.random() * 1.5 + 0.5);
        pushShift();
        return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
    });
    for (let i = 0; i < 100000; i++) {
        let r = 10,
            R = 40;
        let rand = Math.pow(Math.random(), 1.5);
        let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
        pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2));
        sizes.push(Math.random() * 1.5 + 0.5);
        pushShift();
    }

    let g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
    g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));
    let m = new THREE.PointsMaterial({
        size: 0.125,
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        onBeforeCompile: (shader) => {
            shader.uniforms.time = gu.time;
            shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `
                .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
                .replace(
                    `#include <color_vertex>`,
                    `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `
                )
                .replace(
                    `#include <begin_vertex>`,
                    `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `
                );
            //console.log(shader.vertexShader);
            shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `
                .replace(
                    `#include <clipping_planes_fragment>`,
                    `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `
                )
                .replace(
                    `vec4 diffuseColor = vec4( diffuse, opacity );`,
                    `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`
                );
            //console.log(shader.fragmentShader);
        },
    });
    let p = new THREE.Points(g, m);
    p.rotation.order = "ZYX";
    p.rotation.z = 0.2;
    scene.add(p);

    let clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
        controls.update();
        let t = clock.getElapsedTime() * 0.5;
        gu.time.value = t * Math.PI;
        p.rotation.y = t * 0.05;
        renderer.render(scene, camera);
    });
};

const clear = () => {
    scene.traverse((child) => {
        if (child.isMesh) {
            if (child.geometry) {
                child.geometry.dispose();
            }
        }
    });
    scene.clear();
    cancelAnimationFrame(rotationProgress);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    renderer = null;
};

onMounted(() => {
    if (toggle.value) {
        initDx();
    } else {
        initParticles();
    }
});

watch(
    () => toggle.value,
    () => {
        clear();

        if (toggle.value) {
            initDx();
            document.documentElement.setAttribute("class", "dark");
        } else {
            initParticles();
            document.documentElement.setAttribute("class", "light");
        }
    }
);
</script>

<template>
    <div class="start" ref="start">
        <div class="canvas" id="canvas" ref="canvas"></div>
        <div class="content">
            <Nav></Nav>
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss">
@font-face {
    font-family: "DingTalk";
    src: url("https://brzk.brcon.com.cn/file/otherFile/20250409/1830303441967f.ttf");
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: DingTalk;
}
.start {
    width: 100%;
    height: 100vh;
    position: relative;
    #canvas {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
    }
    .content {
        width: 100%;
        height: 100vh;
        position: absolute;
        padding-top: 50px;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }
}
</style>
