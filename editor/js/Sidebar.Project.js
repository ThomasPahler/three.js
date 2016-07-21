/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Project = function ( editor ) {

	var config = editor.config;
	var signals = editor.signals;

	var rendererTypes = {

		'WebGLRenderer': THREE.WebGLRenderer,
		'CanvasRenderer': THREE.CanvasRenderer,
		'SVGRenderer': THREE.SVGRenderer,
		'SoftwareRenderer': THREE.SoftwareRenderer,
		'RaytracingRenderer': THREE.RaytracingRenderer

	};

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );

	// class

	var options = {};

	for ( var key in rendererTypes ) {

		if ( key.indexOf( 'WebGL' ) >= 0 && System.support.webgl === false ) continue;

		options[ key ] = key;

	}

	var rendererTypeRow = new UI.Row();
	var rendererType = new UI.Select().setOptions( options ).setWidth( '150px' ).onChange( function () {

		var value = this.getValue();

		config.setKey( 'project/renderer', value );

		updateRenderer();

	} );

	rendererTypeRow.add( new UI.Text( 'Renderer' ).setWidth( '90px' ) );
	rendererTypeRow.add( rendererType );

	container.add( rendererTypeRow );

	if ( config.getKey( 'project/renderer' ) !== undefined ) {

		rendererType.setValue( config.getKey( 'project/renderer' ) );

	}

	// antialiasing

	var rendererPropertiesRow = new UI.Row().setMarginLeft( '90px' );

	var rendererAntialias = new UI.THREE.Boolean( config.getKey( 'project/renderer/antialias' ), 'antialias' ).onChange( function () {

		config.setKey( 'project/renderer/antialias', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererAntialias );

	// shadow

	var rendererShadows = new UI.THREE.Boolean( config.getKey( 'project/renderer/shadows' ), 'shadows' ).onChange( function () {

		config.setKey( 'project/renderer/shadows', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererShadows );

	rendererPropertiesRow.add( new UI.Break() );

	// gamma input

	var rendererGammaInput = new UI.THREE.Boolean( config.getKey( 'project/renderer/gammaInput' ), 'γ input' ).onChange( function () {

		config.setKey( 'project/renderer/gammaInput', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererGammaInput );

	// gamma output

	var rendererGammaOutput = new UI.THREE.Boolean( config.getKey( 'project/renderer/gammaOutput' ), 'γ output' ).onChange( function () {

		config.setKey( 'project/renderer/gammaOutput', this.getValue() );
		updateRenderer();

	} );
	rendererPropertiesRow.add( rendererGammaOutput );

	container.add( rendererPropertiesRow );

	// Editable

	var editableRow = new UI.Row();
	var editable = new UI.Checkbox( config.getKey( 'project/editable' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/editable', this.getValue() );

	} );

	editableRow.add( new UI.Text( 'Editable' ).setWidth( '90px' ) );
	editableRow.add( editable );

	container.add( editableRow );

	// VR

	var vrRow = new UI.Row();
	var vr = new UI.Checkbox( config.getKey( 'project/vr' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/vr', this.getValue() );
		// updateRenderer();

	} );

	vrRow.add( new UI.Text( 'VR' ).setWidth( '90px' ) );
	vrRow.add( vr );

	container.add( vrRow );
	
	// env map

				var hdrCubeRenderTarget;
	var projectEnvMapRow = new UI.Row();
	var projectEnvMapEnabled = new UI.Checkbox( false );//.onChange( update );
	var projectEnvMap = new UI.Texture( THREE.SphericalReflectionMapping );//.onChange( alert("ok") );
	var projectReflectivity = new UI.Number( 1 ).setWidth( '30px' );//.onChange( update );
	var projectenvMapSetall = new UI.Button( 'SetAll' ).onClick( function () {
		if(projectEnvMap.getValue() == undefined){
		
				//renderer = new THREE.WebGLRenderer( { antialias: false } );
				//renderer.setClearColor( new THREE.Color( 0xffffff ) );
				/*standardMaterial = new THREE.MeshStandardMaterial( {
					map: null,
					bumpScale: - 0.05,
					color: 0xffffff,
					metalness: 0.0,
					roughness: 1.0,
					shading: THREE.SmoothShading
				} );

				var genCubeUrls = function( prefix, postfix ) {
					return [
						prefix + 'px' + postfix, prefix + 'nx' + postfix,
						prefix + 'py' + postfix, prefix + 'ny' + postfix,
						prefix + 'pz' + postfix, prefix + 'nz' + postfix
					];
				};
				var hdrUrls = genCubeUrls( "./textures/cube/pisaHDR/", ".hdr" );
				new THREE.HDRCubeTextureLoader().load( THREE.UnsignedByteType, hdrUrls, function ( hdrCubeMap ) {

					var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
					pmremGenerator.update( renderer );

					var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
					pmremCubeUVPacker.update( renderer );

					hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
					standardMaterial.envMap = hdrCubeRenderTarget.texture;
					standardMaterial.needsUpdate = true;
					SetChildEnvMaps(editor.scene,hdrCubeRenderTarget.texture);

				} );
				//renderer.gammaInput = true;
				//renderer.gammaOutput = true;
				var geometry = new THREE.TorusKnotGeometry( 18, 8, 150, 20 );;
				var torusMesh1 = new THREE.Mesh( geometry, standardMaterial );
				torusMesh1.position.x = 0.0;
				torusMesh1.castShadow = true;
				torusMesh1.receiveShadow = true;
				editor.scene.add( torusMesh1 );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( "./textures/roughness_map.jpg", function( map ) {
					map.wrapS = THREE.RepeatWrapping;
					map.wrapT = THREE.RepeatWrapping;
					map.anisotropy = 4;
					map.repeat.set( 9, 2 );
					standardMaterial.roughnessMap = map;
					standardMaterial.bumpMap = map;
					standardMaterial.needsUpdate = true;
				} );*/
				
		} else{
			SetChildEnvMaps(editor.scene,projectEnvMap.getValue());
			/*for (var i in editor.scene.children) {
				SetChildEnvMaps(editor.scene.children[i],projectEnvMap.getValue());
			}*/
		}
	} );

	//

	function updateRenderer() {

		createRenderer( rendererType.getValue(), rendererAntialias.getValue(), rendererShadows.getValue(), rendererGammaInput.getValue(), rendererGammaOutput.getValue() );

	}

	function createRenderer( type, antialias, shadows, gammaIn, gammaOut ) {

		if ( type === 'WebGLRenderer' && System.support.webgl === false ) {

			type = 'CanvasRenderer';

		}

		rendererPropertiesRow.setDisplay( type === 'WebGLRenderer' ? '' : 'none' );

		var renderer = new rendererTypes[ type ]( { antialias: antialias} );
		renderer.gammaInput = gammaIn;
		renderer.gammaOutput = gammaOut;
		if ( shadows && renderer.shadowMap ) {

			renderer.shadowMap.enabled = true;
			// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		}

		signals.rendererChanged.dispatch( renderer );

	}

	createRenderer( config.getKey( 'project/renderer' ), config.getKey( 'project/renderer/antialias' ), config.getKey( 'project/renderer/shadows' ), config.getKey( 'project/renderer/gammaInput' ), config.getKey( 'project/renderer/gammaOutput' ) );

	return container;

};
