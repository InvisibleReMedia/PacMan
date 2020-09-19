import * as THREE from './build/three.module.js';
import { CinematicCamera } from './x/jsm/cameras/CinematicCamera.js';
import { OBJLoader } from './x/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './x/jsm/loaders/MTLLoader.js';

function getModule() {
    return document.getElementById("module")
}

export default class View3D {

    constructor(left, top, width, height, xsize, ysize, xlength, ylength, grid) {

        getModule().view = this
        this.leftView = left
        this.topView = top
        this.widthView = width
        this.heightView = height
        this.xsize = xsize
        this.ysize = ysize
        this.xlength = xlength
        this.ylength = ylength
        this.grid = grid
        this.ghosts = []
        this.cakes = new Array(xsize).fill(0).map(x => new Array(ysize).fill(0) )
    }

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer( { antialias : true });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.widthView, this.heightView );
        let result = document.body.appendChild( this.renderer.domElement );
        result.style.left = `${this.leftView}px`
        result.style.top = `${this.topView}px`
        result.id = "dom-view"
        result.style.position = "absolute"

    }

    createScene() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x0000ff );

        this.scene.add( new THREE.AmbientLight( 0xffffff, 0.7 ))

        var light = new THREE.DirectionalLight( 0xffffff, 0.7 )
        light.position.set( 0, 0, 500 ).normalize()

        this.scene.add( light )
        // hauteur plafond
        let zsize = 50;
        // Sol
        let geometry = new THREE.BoxBufferGeometry( this.xlength * this.xsize + this.xlength / 2, 1, this.ylength * this.ysize + this.ylength / 2);
        let object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
            color : 0xffffff
        }));
        object.position.x = this.xlength * this.xsize / 2 - this.xlength / 2;
        object.position.y = -zsize / 2;
        object.position.z = this.ylength * this.ysize / 2 - this.ylength / 2;
        this.scene.add( object );

        // Ciel
        object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
            color : 0xffffff,
            map : this.textureCiel
        }));
        object.position.x = this.xlength * this.xsize / 2 - this.xlength / 2;
        object.position.y = zsize / 2;
        object.position.z = this.ylength * this.ysize / 2 - this.ylength / 2;
        this.scene.add( object );

        // cake
        let cakeGeometry = new THREE.SphereGeometry( 5, 5, 5 )
        let cakeMaterial = new THREE.MeshLambertMaterial( { color : 0x0000ff })
        let cake

        // Bords superieurs
        geometry = new THREE.BoxBufferGeometry( this.xlength, zsize, 1 );
        for(let x = 0; x < this.xsize; ++x) {
            object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
                color : 0xff0000,
                map : this.textureWall
            }));
            object.position.x = x * this.xlength;
            object.position.y = 0;
            object.position.z = -this.ylength;
            this.scene.add( object );
            object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
                color : 0xff0000,
                map : this.textureWall
            }));
            object.position.x = x * this.xlength;
            object.position.y = 0;
            object.position.z = this.ysize * this.ylength;
            this.scene.add( object );
        }
        // Bords inferieures
        geometry = new THREE.BoxBufferGeometry( 1, zsize, this.ylength );
        for(var z = 0; z < this.ysize; ++z) {
            object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
                color : 0xff0000,
                map : this.textureWall
            }));
            object.position.x = -this.xlength;
            object.position.y = 0;
            object.position.z = z * this.ylength;
            this.scene.add( object );
            object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
                color : 0xff0000,
                map : this.textureWall
            }));
            object.position.x = this.xsize * this.xlength;
            object.position.y = 0;
            object.position.z = z * this.ylength;
            this.scene.add( object );
        }

        for(let z = 0; z < this.ysize; ++z) {
            for(let x = 0; x < this.xsize; ++x) {

                object = null;
                let color = Math.random() * 0xffffff;
                if (this.grid[x + z * this.xsize] == "WALL") {

                    geometry = new THREE.BoxBufferGeometry( this.xlength, zsize, this.ylength );
                    object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
                        color : color,
                        map : this.textureWall
                    }));
                    object.position.x = x * this.xlength;
                    object.position.y = 0;
                    object.position.z = z * this.ylength;

                    this.scene.add( object );
                } else if (this.grid[x + z * this.xsize] == "CAKE") {
                    cake = new THREE.Mesh( cakeGeometry, cakeMaterial );
                    cake.position.x = x * this.xlength;
                    cake.position.y = -10;
                    cake.position.z = z * this.ylength;
                    cake.name = `cake${x}-${z}`;
                    // store each cakes before remove
                    this.cakes[x][z] = cake;
                    this.scene.add( cake );
                }
            }
        }

    }

    removeCake(x, y) {
        if (this.cakes[x][y]) {
            this.scene.remove(this.cakes[x][y])
            this.cakes[x][y] = null
        }
    }
    
    setCameraPosition(  ) {

        let x = getModule().pacman.currentx * 2
        let y = getModule().pacman.currenty * 2
        let orientation = getModule().pacman.currentOrientation
        this.camera.position.set(x, 0, y)
        switch(orientation) {
            case 'left':
                this.camera.rotation.z = -Math.PI
                this.camera.rotation.y = Math.PI / 2
                break
            case 'right':
                this.camera.rotation.z = -Math.PI
                this.camera.rotation.y = -Math.PI / 2
                break
            case 'top':
                this.camera.rotation.z = Math.PI
                this.camera.rotation.y = 0
                break
            case 'bottom':
                this.camera.rotation.z = Math.PI
                this.camera.rotation.y = -Math.PI
                break
        }
    }

    setGhostPosition(ghostNumber, x, y, orientation) {
        this.ghosts[ghostNumber].position.x = x
        this.ghosts[ghostNumber].position.z = y
        switch(orientation) {
            case 'left':
                this.ghosts[ghostNumber].rotation.y = Math.PI / 2
                break
            case 'right':
                this.ghosts[ghostNumber].rotation.y = -Math.PI / 2
                break
            case 'top':
                this.ghosts[ghostNumber].rotation.y = 0
                break
            case 'bottom':
                this.ghosts[ghostNumber].rotation.y = -Math.PI
                break
        }
    }

    addCameras() {

        this.camera = new THREE.PerspectiveCamera(-110, this.widthView / this.heightView, 1, 5000 )
    }

    addLights() {


    }

    addObjects() {

        // ghost
        var mtlLoader = new MTLLoader()
        mtlLoader.load('ghost2_purple.mtl', m => {
            m.preload()
            var loader = new OBJLoader()
            loader.setMaterials(m)
            loader.load("ghost2_purple.obj", (obj) => {
                this.ghosts[0] = obj
                obj.position.x = 100
                obj.position.y = -10
                obj.position.z = 240
                obj.rotation.z = Math.PI
                obj.rotation.x = Math.PI
                obj.scale.set( 4.0, 4.0, 4.0 )
                this.scene.add( obj )
            }, undefined, function( error ) {
                console.error( error )
            })
    
        })

        var mtlLoader = new MTLLoader()
        mtlLoader.load('ghost2_red.mtl', m => {
            m.preload()
            var loader = new OBJLoader()
            loader.setMaterials(m)
            loader.load("ghost2_red.obj", (obj) => {
                this.ghosts[1] = obj
                obj.position.x = 100
                obj.position.y = -10
                obj.position.z = 240
                obj.rotation.z = Math.PI
                obj.rotation.x = Math.PI
                obj.scale.set( 4.0, 4.0, 4.0 )
                this.scene.add( obj )
            }, undefined, function( error ) {
                console.error( error )
            })
    
        })

        var mtlLoader = new MTLLoader()
        mtlLoader.load('ghost2_blue.mtl', m => {
            m.preload()
            var loader = new OBJLoader()
            loader.setMaterials(m)
            loader.load("ghost2_blue.obj", (obj) => {
                this.ghosts[2] = obj
                obj.position.x = 100
                obj.position.y = -10
                obj.position.z = 240
                obj.rotation.z = Math.PI
                obj.rotation.x = Math.PI
                obj.scale.set( 4.0, 4.0, 4.0 )
                this.scene.add( obj )
            }, undefined, function( error ) {
                console.error( error )
            })
    
        })

        var mtlLoader = new MTLLoader()
        mtlLoader.load('ghost2_green.mtl', m => {
            m.preload()
            var loader = new OBJLoader()
            loader.setMaterials(m)
            loader.load("ghost2_green.obj", (obj) => {
                this.ghosts[3] = obj
                obj.position.x = 100
                obj.position.y = -10
                obj.position.z = 240
                obj.rotation.z = Math.PI
                obj.rotation.x = Math.PI
                obj.scale.set( 4.0, 4.0, 4.0 )
                this.scene.add( obj )
            }, undefined, function( error ) {
                console.error( error )
            })
    
        })

    }

    addTextures() {

        this.textureCiel = new THREE.TextureLoader().load( "../assets/images/ciel-bleu.jpg" )
        this.textureWall = new THREE.TextureLoader().load( "../assets/images/prairie.jpg" )

    }

    animate() {

        getModule().view.render()
        requestAnimationFrame( getModule().view.animate )

    }

    render() {

        this.renderer.clear()
        this.renderer.render( this.scene, this.camera )


    }

}
