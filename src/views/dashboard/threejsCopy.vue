<template>
  <div ref="thress" class="three-dom"></div>
</template>
     
 
 <script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const thress = ref(null);
const scene = new THREE.Scene({
  color: "white"
});
// 创建GLTF加载器对象
const loader = new GLTFLoader();
function init() {
  //创建物体形状
  //const geometry =  new THREE.BoxGeometry(100,100,100)

  // //创建材质
  // const  marterial =  new THREE.MeshBasicMaterial({color:"red"})
  const geometry = new THREE.PlaneGeometry(60, 60);
  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load("/webstorm.png")
  });
  const mesh = new THREE.Mesh(geometry, material);
  //创建物体

  //const mesh =  new THREE.Mesh(geometry,marterial)

  //创建场景
  
  const cuTextloade= new THREE.CubeTextureLoader()
  const texts = cuTextloade.load([
    "/webstorm.png",
    "/webstorm.png",
   "/webstorm.png",
    "/webstorm.png",
     "/webstorm.png",
    "/webstorm.png",
  ]);
  
  
  scene.environment = texts;

  //将物体添加到场景中
  //    scene.add(mesh)
  console.log(thress.value.clientWidth, thress.value.clientHeight, "-fwefwfef");
  loader.load("/gltf/officeBlock.gltf", function(gltf) {
    console.log("控制台查看加载gltf文件返回的对象结构", gltf);
    console.log("gltf对象场景属性", gltf.scene);
    //设置材质的金属度
    gltf.scene.traverse(child => {
      if (child.isMesh) {
        child.material.metalness = 1 //设置金属度
        
      }
    });

    // 返回的场景对象gltf.scene插入到threejs场景中
    scene.add(gltf.scene);
  });

  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    thress.value.clientWidth / thress.value.clientHeight,
    0.1,
    1000
  );

  //设置相机位置
  camera.position.set(-100, 100, 100);
  //光照
//    //创建一个平行光
//   const directionalLight = new THREE.DirectionalLight(0xffffff);
//   //设置光源位置
//   directionalLight.position.set(100, 100, 100).normalize();
  //将光源添加到场景中

  // var ambientLight = new THREE.AmbientLight(0x404040);
  // scene.add(ambientLight);

  // var directionalLight = new THREE.DirectionalLight(0xffffff);
  // directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(thress.value.clientWidth, thress.value.clientHeight);
  thress.value.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.update();
  const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
}

onMounted(() => {
  init();
});
</script>
 <style scoped lang="scss">
.three-dom {
  width: 100%;
  height: 100%;
}
</style>