import{df as fe,bo as Y,lZ as re,dk as X,d_ as Ri,e6 as ve,di as oe,dz as ce,kA as Tt,hx as et,mg as yr,bp as Wt,ef as $r,br as Ne,bt as P,nT as Dr,dh as q,bD as Ii,eo as Pr,e7 as Tr,t9 as Wi,ee as Mi,Bm as zr,rW as Cr,bl as wr,jT as rt,dP as Ie,mh as le,io as J,BQ as Mt,X as S,kT as Or,_ as Lr,my as Nt,a1 as _r,a7 as zt,qA as tt,dj as Ut,ea as ge,dg as jt,AA as Fr,dl as Ct,lk as wt,qB as he,ij as Ni,fx as Er,ab as Ar,d4 as Vr,BR as Rr,dD as Ir,c6 as Ui,qs as Wr,tL as ji,h8 as Re,dT as ki,b0 as Mr,sE as Ue,bs as Nr}from"./index-Dmtgfku4.js";import{g as xe,_ as Ur,C as jr,v as kt,y as kr,f as Bi}from"./lineSegment-B01kCRGN.js";import{B as Bt,w as je,q as ee,b as Jt,v as at}from"./plane-BQpM3x68.js";import{h as Ji,d as Te,X as Ht,g as Br,N as Jr}from"./BufferView-_b4_pKGU.js";import{u as We,g as Q,e as s,b as ze,d as b,h as Hr,j as Gr,i as x,a as Yr,k as qr,l as Xr,m as Gt,o as Kr,p as ke,n as Zr}from"./getEmissions.glsl-C48L9Ou5.js";import{a as Hi,c as Qr,K as ea,S as Ot,i as ta,b as ia,e as Vt,f as Gi,g as Yt,u as ra,h as aa,j as nt,k as Rt,l as Lt,m as Yi,n as qi,o as Xi,p as na,q as sa,r as Ki,s as oa,v as la,w as ca,x as da,y as pa,z as ua,A as fa,B as ha,C as ma,D as qt,E as ga,F as Xt,G as Be,H as va,I as Sa,J as xa,L as ba,M as Kt,O as ya,P as $a,Q as Zt,R as Zi,T as Da,U as Qt,_ as _t,V as Qi,W as Pa,X as Ta,Y as Ft,Z as za,$ as Ca,a0 as wa,a1 as Oa,a2 as La,a3 as _a,a4 as Fa,a5 as ei,a6 as Ea,a7 as Aa,a8 as ti,a9 as ii,aa as Va,ab as Je,ac as Ra}from"./OutputColorHighlightOLID.glsl-B05J6Odi.js";import{i as Ia,s as Wa,g as Ma,v as Na,r as Ua,a as ja,b as ka,_ as Ba,n as Ja,e as Ha,t as Ga,o as Ya,c as qa}from"./SSAO.glsl-iF6K7u8k.js";import{a as se,K as Xa,n as Ka,f as ri}from"./InterleavedLayout-CLBXAKI_.js";import{i as er,t as Za,N as ai,g as Qa,_ as en,d as tn,h as rn}from"./HUDMaterial.glsl-CrJYDKzb.js";import{u as an,g as lt,N as tr,s as nn,p as sn}from"./frustumPlanes-BurDfkJZ.js";import{b as on}from"./ray-DITgQkN8.js";import{j as ln}from"./sphere-9arXhHwV.js";import{T as He,g as ct,c as ni}from"./RenderingContext-DH--_QN5.js";import{e as Me}from"./AlphaCutoff-pStc-i3u.js";import"./DDSUtil-tM4hsLMf.js";import{c as si,i as cn}from"./doublePrecisionUtils-CW5W7VLJ.js";import{i as dn}from"./TextureBackedBufferLayout-CbeMVaOg.js";let Bs=class extends ea{constructor(){super(...arguments),this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.shadingEnabled=!1,this.isDecoration=!1,this.worldSized=!1}},pn=class extends Hi{constructor(){super(...arguments),this.primitiveVertexCount=1}updateConfiguration(e){super.updateConfiguration(e),this._configuration.pbrMode=this.parameters.shadingEnabled?2:0,this._configuration.draped=e.slot===18,this._configuration.shadingEnabled=this.parameters.shadingEnabled,this._configuration.worldSized=this.parameters.worldSized,this._configuration.emissionSource=+!!this.emissions,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.hasOccludees=e.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===8,We(e.output)&&this.parameters.shadingEnabled?(this._configuration.receiveShadows=e.shadowMap.enabled,this._configuration.hasShadowHighlights=Ia(this._configuration,e),this._configuration.receiveAmbientOcclusion=e.ssao!=null,this._configuration.receiveGlobalIllumination=e.globalIlluminationEnabled):this._configuration.receiveShadows=this._configuration.hasShadowHighlights=this._configuration.receiveAmbientOcclusion=this._configuration.receiveGlobalIllumination=!1}computeAttachmentOrigin(e,t,i){return Qr(e,t,i,this._isClosed(i))}_isClosed(e){return(this.parameters.isClosed??!1)&&e>2}};function un(r,e,t,i,a,n){an(a,0,1/0,K);for(let m of[0,1,2])if(!lt(m,Math.min(r[m],e[m])-t,Math.max(r[m],e[m])+t,K))return null;if(!Bt(i.frustum[4],K)||!Bt(i.frustum[5],K))return null;let o=ir(r,e,i,Z,j,n);if(o===0)return null;fe(ie,a.origin,r);let l=Y(ie,n),c=Y(a.direction,n),d=li(a.direction,n);if(Math.abs(c)>d){let m=-l/c;return m<K.c0||m>K.c1?null:(re(ie,ie,a.direction,m),ar(Y(ie,Z),Y(ie,j),o,t*t)?m:null)}if(Math.abs(l)>li(ie,n))return null;let p=Y(ie,Z),f=Y(ie,j),h=Y(a.direction,Z),v=Y(a.direction,j);return X(K.ray.origin,p,f,0),X(K.ray.direction,h,v,0),!lt(0,-t,o+t,K)||!lt(1,-t,t,K)?null:fn(K,o,t)}function fn(r,e,t){let i=sn(r,ie);if(ar(i[0],i[1],e,t*t))return r.c0;X(dt.center,i[0]<0?0:e,0,0),dt.radius=t;let a=r.ray.direction;if(!dt.intersectRay(on(i,a),ci))return null;let n=Math.abs(a[0])>Math.abs(a[1])?0:1,o=r.c0+(ci[n]-i[n])/a[n];return o<=r.c1?o:null}function hn(r,e,t,i,a){let n=rr(r,e,t,nr);if(!tr(a.broadPhaseFrustum,n,null)||ir(r,e,i,Z,j,mn)===0)return!1;let[o,l,c,d]=pt;return De(o,r,Z,j,-t,-t),De(l,e,Z,j,t,-t),De(c,e,Z,j,t,t),De(d,r,Z,j,-t,t),Ot(a,pt,i,Et)?(re(o,r,j,-t),re(l,e,j,-t),re(c,e,j,t),re(d,r,j,t),Ot(a,pt,i,Et)?!0:oi(r,-t,Z,j,i,a)||oi(e,t,Z,j,i,a)):!1}function oi(r,e,t,i,a,n){let o=Math.abs(e);if(!tr(n.broadPhaseFrustum,rr(r,r,o,nr),null))return!1;we.length=0,q(we.pushNew(),r),De(we.pushNew(),r,t,i,0,o);for(let[l,c]of gn)De(we.pushNew(),r,t,i,l*e,c*o);return Ot(n,we,a,Et)}function ir(r,e,t,i,a,n){fe(i,e,r);let o=ve(i);if(o===0)return 0;oe(i,i,1/o);let l=t.viewMatrix;ce(Ge,r,l),Tt(Ce,l),et(Ye,i,Ce);let c=t.projectionMatrix,d=c[11]*Ge[2]+c[15],p=c[11]*Ye[2],f=c[0]*(Ye[0]*d-Ge[0]*p),h=c[5]*(Ye[1]*d-Ge[1]*p),v=t.fullViewport,m=h*v[3]/(c[0]*v[2]),g=-f*v[2]/(c[5]*v[3]),y=Math.hypot(m,g);if(y===0)return 0;let u=m/y,$=g/y;return X(a,u,$,0),yr(Ce,Ce),et(a,a,Ce),Wt(n,i,a),$r(n)===0?0:(Ne(n,n),Wt(a,n,i),o)}function rr(r,e,t,i){return Dr(Math.min(r[0],e[0])-t,Math.min(r[1],e[1])-t,Math.min(r[2],e[2])-t,Math.max(r[0],e[0])+t,Math.max(r[1],e[1])+t,Math.max(r[2],e[2])+t,i)}function li(r,e){return 16*2**-52*(Math.abs(r[0]*e[0])+Math.abs(r[1]*e[1])+Math.abs(r[2]*e[2]))}function De(r,e,t,i,a,n){re(r,e,t,a),re(r,r,i,n)}function ar(r,e,t,i){let a=r<0?r:r>t?r-t:0;return a*a+e*e<=i}const Z=P(),j=P(),mn=P(),ie=P(),Ge=P(),Ce=Ii(),Ye=P(),K=nn(),dt=new ln,ci=P(),nr=Pr(),gn=Array.from({length:3},(r,e)=>{let t=(e+1)*Math.PI/3;return e===2?[0,-1]:[Math.sin(t),Math.cos(t)]}),pt=[P(),P(),P(),P()],we=new Ri({allocator:r=>r??P()}),Et=new Ri({allocator:r=>r??P()});function vn(r,e){let{vertex:t}=r;t.uniforms.add(new Q("intrinsicWidth",n=>n.width));let{hasScreenSizePerspective:i,spherical:a}=e;i?(r.include(ta,e),ia(t),Vt(t,e),t.uniforms.add(new Gi("inverseViewMatrix",(n,o)=>Tr(di,Wi(di,o.camera.viewMatrix,n.origin)))),t.code.add(s`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${a?s`normalize(worldPos + localOrigin)`:s`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):t.code.add(s`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),e.hasVVSize?(t.uniforms.add(new ze("vvSizeMinSize",n=>n.vvSize.minSize),new ze("vvSizeMaxSize",n=>n.vvSize.maxSize),new ze("vvSizeOffset",n=>n.vvSize.offset),new ze("vvSizeFactor",n=>n.vvSize.factor),new ze("vvSizeFallback",n=>n.vvSize.fallback)),t.code.add(s`
    float getSize(${b(i,"vec3 pos")}) {
      float value = ${t.inputs.get("sizeFeatureAttribute")};
      float size = isnan(value)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${b(i,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):t.code.add(s`
    float getSize(${b(i,"vec3 pos")}) {
      float fullSize = intrinsicWidth * ${t.inputs.get("size")};
      return ${b(i,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `),e.hasVVOpacity?(t.constants.add("vvOpacityNumber","int",8),t.uniforms.add(new Yt("vvOpacityValues",8,n=>n.vvOpacity.values),new Yt("vvOpacityOpacities",8,n=>n.vvOpacity.opacityValues),new Q("vvOpacityFallback",n=>n.vvOpacity.fallback,{supportsNaN:!0})),t.code.add(s`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      float value = ${t.inputs.get("opacityFeatureAttribute")};
      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${b(e.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(value));
    }
    `)):t.code.add(s`vec4 applyOpacity(vec4 color) {
return color;
}`),e.hasVVColor?(r.include(ra,e),t.code.add(s`
    vec4 getColor() {
      vec4 color = interpolateVVColor(${t.inputs.get("colorFeatureAttribute")});

      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      return applyOpacity(color);
    }
    `)):t.code.add(s`
    vec4 getColor() {
      return applyOpacity(${t.inputs.get("color")});
    }
    `)}const di=Mi();function Sn(r){r.include(Wa),r.fragment.uniforms.add(new Gi("inverseViewMatrix",(e,t)=>{let i=Wi(xn,t.camera.viewMatrix,e.localOrigin);return zr(i,i)})).code.add(s`vec4 reconstructLocalPosition(vec2 coord, float linearDepth) {
vec4 cameraSpace = vec4(reconstructPosition(coord, linearDepth), 1.0);
return inverseViewMatrix * cameraSpace;
}`)}const xn=Mi();function bn(r,e){r.include(Ma,e),r.include(Sn),r.fragment.include(aa),r.fragment.code.add(s`float readFragmentShadow(float additionalAmbientScale) {
vec3 pos = reconstructLocalPosition(gl_FragCoord.xy, linearizeDepth(gl_FragCoord.z)).xyz;
return readShadow(additionalAmbientScale, pos);
}`)}function yn(r,e){let{vertex:t,fragment:i}=r;r.include(bn,e),i.include(Na,e),i.include(Ua,e),ja(i),Vt(i,e),t.main.add("forwardLinearDepthToReadShadow();"),i.uniforms.add(ka,Ba,t.uniforms.get("localOrigin")).code.add(s`vec4 evaluateSceneLightingFragment(vec3 vpos, vec3 normal, vec4 albedo) {
vec3 posWorld = vpos + localOrigin;
float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
float shadow = readFragmentShadow(additionalAmbientScale);
float ssao = evaluateAmbientOcclusionInverse();
vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
vec3 viewDirection = normalize(vpos - cameraPosition);
return vec4(
evaluateSceneLighting(normal, albedo.rgb, shadow, 1.0 - ssao, additionalLight, viewDirection, normal),
albedo.a);
}`)}function $n(r){r.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function sr(r){r.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}function Dn(r){return r.pattern.map(e=>Math.round(e*r.pixelRatio))}function Pn(r){if(r==null)return 1;let e=Dn(r);return Math.floor(e.reduce((t,i)=>t+i,0))}function Tn(r){return r==null?Cr:r.length===4?r:wr(zn,r[0],r[1],r[2],1)}const zn=rt();function Cn(r,e){if(!e.stippleEnabled){r.fragment.code.add(s`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);return}let t=!(e.draped&&e.stipplePreferContinuous),{vertex:i,fragment:a}=r;e.draped||(Vt(i,e),i.uniforms.add(new nt("worldToScreenPerDistanceRatio",({camera:l})=>1/l.screenPixelSizePerDistance)).code.add(s`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),r.varyings.add("vStippleDistance","float"),r.varyings.add("vStippleLimitsAndCaps","vec4"),r.varyings.add("vStipplePatternStretch","float"),i.code.add(s`
    float discretizeStippleDistanceToScreenRatio(float stippleDistanceToScreenRatio) {
      float step = ${s.float(wn)};

      float discreteStippleDistanceToScreenRatio = log(stippleDistanceToScreenRatio);
      discreteStippleDistanceToScreenRatio = ceil(discreteStippleDistanceToScreenRatio / step) * step;
      discreteStippleDistanceToScreenRatio = exp(discreteStippleDistanceToScreenRatio);
      return discreteStippleDistanceToScreenRatio;
    }
  `),Rt(i),i.code.add(s`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${t?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),a.uniforms.add(new Hr("stipplePatternTexture",l=>l.stippleTexture),new Q("stipplePatternPixelSizeInv",l=>1/or(l))),e.stippleOffColorEnabled&&a.uniforms.add(new Lt("stippleOffColor",l=>Tn(l.stippleOffColor))),r.include(sr);let n=e.worldSized&&e.imagePattern,{usePerspectiveCorrectStipple:o}=e;o&&r.varyings.add("vStipplePerspective","vec4"),n?(r.varyings.add("vStippleV","float"),r.fragment.include(Ja),a.code.add(s`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleLimitsAndCaps.xy + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = (vStippleLimitsAndCaps.z <= 0.0 && vStippleDistance < aaCorrectedLimits.x) ||
(vStippleLimitsAndCaps.w <= 0.0 && vStippleDistance > aaCorrectedLimits.y);
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):a.code.add(s`
    float getStippleSDF(out bool isClamped) {
      ${b(e.worldSized,s`
          float unclampedStippleDistance = noPerspectiveRead(vStippleDistance);
          float stippleDistancePerPixel = length(vec2(dFdx(unclampedStippleDistance), dFdy(unclampedStippleDistance)));
        `,s`float stippleDistancePerPixel = 1.0;`)}

      bool clampStart = vStippleLimitsAndCaps.z <= 0.0;
      bool clampEnd = vStippleLimitsAndCaps.w <= 0.0;
      float stippleDistance = vStippleDistance;
      if (clampStart) {
        stippleDistance = max(stippleDistance, vStippleLimitsAndCaps.x);
      }
      if (clampEnd) {
        stippleDistance = min(stippleDistance, vStippleLimitsAndCaps.y);
      }
      stippleDistance = noPerspectiveRead(stippleDistance);
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      ${b(o,s`
          // Convert screen-space progress to progress along the 3D segment using the endpoints' inverse clip-W values.
          // This keeps dash lengths constant in world units, so farther dashes appear shorter on screen.
          vec4 stipplePerspective = noPerspectiveRead(vStipplePerspective);
          float segmentLength = stipplePerspective.y - stipplePerspective.x;
          float segmentFactor = segmentLength > 0.0 ? (stippleDistance - stipplePerspective.x) / segmentLength : 0.0;
          float interpolatedInverseW = mix(stipplePerspective.z, stipplePerspective.w, segmentFactor);
          float perspectiveFactor = segmentFactor * stipplePerspective.w / interpolatedInverseW;
          stippleDistance = mix(stipplePerspective.x, stipplePerspective.y, perspectiveFactor);
        `)}

        vec2 aaCorrectedLimits = vStippleLimitsAndCaps.xy + vec2(1.0, -1.0) * stippleDistancePerPixel / gl_FragCoord.w;
      isClamped = (clampStart && vStippleDistance < aaCorrectedLimits.x) ||
          (clampEnd && vStippleDistance > aaCorrectedLimits.y);

      float u = stippleDistance * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return sdf;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${e.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `),a.code.add(s`
    float getStippleCapDistance() {
      return (getStippleSDF() * 2.0 - 1.0) * vStipplePatternStretch;
    }

    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${b(!e.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }
  `)}function or(r){let e=r.stipplePattern;return er(e)?e.length:e?Pn(e)/e.pixelRatio:1}const wn=.4,Gs=64,Ys=32,On=32/5,Ln=64/On,qs=.25;function _n(r,e){let t=r.vertex,i=e.hasScreenSizePerspective,a=e.worldSized,n=a&&!e.draped;Rt(t),t.constants.add("markerSizePerLineWidth","float",Ln),t.uniforms.add(new Q("markerScale",({markerScale:o})=>o)),a&&t.uniforms.add(new nt("groundMetersToScreenRatio",o=>1/(o.screenToPlanarDistanceRatio*o.planarDistanceToGroundRatio))),t.code.add(s`float getScreenMarkerSize(float lineWidth) {
return markerScale * markerSizePerLineWidth * lineWidth;
}`),t.code.add(b(n,s`
        float getLineWidth(vec3 pos) {
          float size = getSize(${b(i,"pos")});
          float metersPerScreenPixel = max(-pos.z, nearFar[0]) * metersPerRenderUnit * screenPixelSizePerDistance;
          return max(size / metersPerScreenPixel, 1.0) * pixelRatio;
        }
    `,s`
        float getLineWidth(${b(e.lineWidthRequiresPosition,"vec3 pos")}) {
          float size = max(getSize(${b(i,"pos")}), 1.0);
          return ${b(a,"size * pixelRatio * groundMetersToScreenRatio","size * pixelRatio")};
        }
    `)),n?t.uniforms.add(Yi,qi,Xi):t.uniforms.add(na),t.code.add(b(n,s`
        float getWorldMarkerSize(vec3 pos) {
          return markerScale * markerSizePerLineWidth * getSize(${b(i,"pos")}) * 0.5 / metersPerRenderUnit;
        }
      `,s`
        float getWorldMarkerSize(vec3 pos) {
          float distanceToCamera = length(pos);
          float screenToWorldRatio = renderPixelSizePerDistance * distanceToCamera * 0.5;
          return getScreenMarkerSize(getLineWidth(${b(i,"pos")})) * screenToWorldRatio;
        }
      `)),t.constants.add("maxSegmentLengthFraction","float",.45),t.code.add(b(n,s`bool areWorldMarkersHidden(vec3 pos, vec3 other) {
return getWorldMarkerSize(pos) > maxSegmentLengthFraction * length(pos - other);
}`,s`
        bool areWorldMarkersHidden(vec3 pos, vec3 other) {
          vec3 midPoint = mix(pos, other, 0.5);
          float distanceToCamera = length(midPoint);
          float screenToWorldRatio = renderPixelSizePerDistance * distanceToCamera * 0.5;
          float worldMarkerSize = getScreenMarkerSize(getLineWidth(${b(i,"pos")})) * screenToWorldRatio;
          float segmentLen = length(pos - other);
          return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
        }
      `))}const Fn=Ie(1),En=Ie(1);function An(r,e){let{animation:t}=e,{varyings:i,vertex:a,fragment:n}=r;i.add("vTimeStamp","float"),i.add("vFirstTime","float"),i.add("vLastTime","float"),i.add("vTransitionType","float"),a.main.add(s`vTimeStamp = animatedAlphaTimeStamps.x;
vFirstTime = animatedAlphaTimeStamps.y;
vLastTime = animatedAlphaTimeStamps.z;
vTransitionType = animatedAlphaTimeStamps.w;`),t===3&&n.constants.add("decayRate","float",2.3),n.code.add(s`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${Vn(t)}
    }`),n.uniforms.add(new Q("timeElapsed",o=>o.timeElapsed),new Q("trailLength",o=>o.trailLength),new Q("speed",o=>o.animationSpeed),new sa("startEndTime",o=>le(Rn,o.startTime,o.endTime))),n.constants.add("fadeInTime","float",En),n.constants.add("fadeOutTime","float",Fn),n.constants.add("incomingTransition","int",0),n.constants.add("outgoingTransition","int",2),n.code.add(s`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
float animatedAlpha() {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
return alpha;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return 0.0;
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
return alpha;
}`)}function Vn(r){switch(r){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}const Rn=J();function In(r){switch(r.elementType){case"float":switch(r.elementCount){case 1:return s`float`;case 2:return s`vec2`;case 3:return s`vec3`;case 4:return s`vec4`;case 9:return s`mat3`;default:r.elementCount}break;case"int":switch(r.elementCount){case 1:return s`int`;case 2:return s`ivec2`;case 3:return s`ivec3`;case 4:return s`ivec4`;case 9:throw Error("Invalid element count 9 for type int");default:r.elementCount}break;case"uint":switch(r.elementCount){case 1:return s`uint`;case 2:return s`uvec2`;case 3:return s`uvec3`;case 4:return s`uvec4`;case 9:throw Error("Invalid element count 9 for type uint");default:r.elementCount}break;default:r.elementType}throw Error("unsupported field")}const lr=new nt("constNaN",()=>NaN,{supportsNaN:!0});let It=class extends Gr{constructor(e){super(),this.supportNaN=e}};S([x()],It.prototype,"supportNaN",void 0);function Wn(r,e){let t=e?.supportNaN;t&&(r.uniforms.add(lr),r.code.add(s`bool bitsEncodeFloat16NaN(highp uint bits) {
const highp uint nanExponent = 0x00007c00u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x000003ffu;
return exponent == nanExponent && mantissa != 0u;
}`)),r.code.add(s`
    mediump float unpackHalf1x16(highp uint bits) {
      ${b(t,s`
        if (bitsEncodeFloat16NaN(bits)) {
          return constNaN;
        }`)}
      return unpackHalf2x16(bits).x;
    }`),r.code.add(s`
    mediump vec2 unpackHalf2x16NaNSupport(highp uint bits) {
      vec2 result = unpackHalf2x16(bits);
      ${b(t,s`
        if (bitsEncodeFloat16NaN(bits)) {
          result.x = constNaN;
        }
        if (bitsEncodeFloat16NaN(bits >> ${s.uint(me[2])})) {
          result.y = constNaN;
        }
        `)}
      return result;
    }`)}function Mn(r,e){let t=e?.supportNaN;t&&(r.uniforms.add(lr),r.code.add(s`bool bitsEncodeFloat32NaN(highp uint bits) {
const highp uint nanExponent = 0x7f800000u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x007fffffu;
return exponent == nanExponent && mantissa != 0u;
}`)),r.code.add(s`
    highp float unpackFloat1x32(highp uint bits) {
      ${b(t,s`
        if (bitsEncodeFloat32NaN(bits)) {
          return constNaN;
        }`)}
      return uintBitsToFloat(bits);
    }`)}function Nn(r){r.code.add(s`mediump int unpackInt1x16(highp uint bits) {
highp uint signExtendedBits = (bits & 0x8000u) != 0u ? (bits | 0xffff0000u) : bits;
return int(signExtendedBits);
}`)}function Un(r,e){let{fieldType:t}=r,i=Bn[t];return`${i(Jn(r,e))}`}function qe(r,e){let t=[];for(let i of r){let a=s`unpackFloat1x32(${i})`;t.push(a)}return t.join(e)}const jn=r=>s`${r[0]}`,kn=r=>s`uvec4(${r.join(", ")})`,pi=r=>s`${r[0]}`,ui=r=>{let e=r[0],t=s`uvec4(${s.uint(me[0])}, ${s.uint(me[1])}, ${s.uint(me[2])}, ${s.uint(me[3])})`,i=s`uvec4(${s.hexuint(cr[1])})`;return s`((uvec4(${e}) >> ${t}) & ${i})`},Bn={u8:pi,u32:jn,vec4u32:kn,unorm8:r=>s`(float(${pi(r)})/${s.float(Mt)})`,vec4unorm8:r=>s`(vec4(${ui(r)})/${s.float(Mt)})`,snorm16:r=>s`unpackSnorm2x16(${r[0]}).x`,vec2snorm16:r=>s`unpackSnorm2x16(${r[0]})`,f16:r=>s`unpackHalf1x16(${r[0]})`,vec4f16:r=>s`vec4(unpackHalf2x16NaNSupport(${r[0]}), unpackHalf2x16NaNSupport(${r[1]}))`,f32:r=>s`unpackFloat1x32(${r[0]})`,vec4u8:ui,vec2f32:r=>s`vec2(${qe(r,", ")})`,vec3f32:r=>s`vec3(${qe(r,", ")})`,vec4f32:r=>s`vec4(${qe(r,", ")})`,mat3f32:r=>s`mat3(${qe(r,`,
`)})`};function Jn(r,e){let{byteOffset:t,byteSize:i}=r,a=e.channelByteStride,n=e.byteStride,o=Math.ceil(i/ut),l=Hn[e.channels],c=[];for(let d=0;d<o;++d){let p=d*ut,f=t+p,h=i-p,v=Math.min(h,ut),m=0,g=[];for(;m<v;){let y=f+m,u=Math.floor(y/n),$=y%n,C=Math.floor($/a),z=$%a,T=a-z,w=v-m,A=Math.min(T,w),O=s`texel${s.int(u)}${l[C]}`,V=A===4?"":s` & ${s.hexuint(cr[A])}`,L=z===0?"":s` >> ${s.uint(me[z])}`,_=s`((${O}${L})${V})`,D=m===0?"":s` << ${s.uint(me[m])}`,F=s`(${_})${D}`;g.push(F),m+=A}c.push(s`(${g.join(" | ")})`)}return c}const ut=4,me=[0,8,16,24],cr=[0,255,65535,16777215,4294967295],Hn={1:[s``],2:[s`.x`,s`.y`],4:[s`.x`,s`.y`,s`.z`,s`.w`]},Gn=new It(!0),Yn=new It(!1);let qn=class{constructor(e,t){this._shader=e,this._namespace=t,this._used=new Map}getItemSuffix(e){return e===0?"":`${e<0?"Minus":"Plus"}${Math.abs(e)}`}getItemDataName(e=0){return`${this._namespace}ItemData${this.getItemSuffix(e)}`}getStructName(e=0){return`${this._namespace}TextureBackedBufferItemData${this.getItemSuffix(e)}`}getFetchName(e=0){return`${this._namespace}fetchTextureBackedBufferItemData${this.getItemSuffix(e)}`}getStrideName(){return`${this._namespace}tbbStride`}getTextureAttribute(e,t=0){let i=this._used,a=this.getItemDataName(t),n=i.get(t);return n??(n=new Set,i.set(t,n)),n.add(e),s`${a}.${e}`}generateVertexCode(e){let{_shader:t,_used:i}=this,a=new si(t.vertex);for(let n of i.keys())this._generateFetchFunction(n,a,e);return a.generateSource()}generateVertexMainCode(e){let{_shader:t,_used:i}=this,a=new si(t.vertex);for(let n of i.keys())this._generateFetchFunctionCall(n,a,e);return a.generateSource()}_generateFetchFunctionCall(e,t,i){let{itemIndexExpression:a}=i,n=this._used.get(e);if(n==null||n.size===0)return;let o=this.getItemDataName(e),l=this.getFetchName(e);t.add(s`${o} = ${l}(${a});`)}_getIndexOffset(e=0){return e===0?s``:s`${e<0?"-":"+"}${s.uint(Math.abs(e))}`}_generateFetchFunction(e,t,i){let{bufferUniform:a,layout:n}=i,{texelFormatInfo:o}=n,l=this._used.get(e);if(l==null||l.size===0)return;let c=this.getStrideName(),d=this.getStructName(e),p=this.getItemDataName(e),f=this.getFetchName(e),h=this._getIndexOffset(e),v=[];for(let u of n.fields.values())l.has(u.name)&&v.push(u);if(v.length===0)return;let m=[];for(let u=0;u<n.texelStride;++u)m.push(!1);for(let u of v)for(let $=0;$<u.numTexels;++$)m[u.startTexel+$]=!0;t.add(s`
  struct ${d} {`);for(let u of v)t.add(s`\t${In(u)} ${u.name};`);t.add(s`};`),t.add(s`\n${d} ${f}( highp uint baseIndex ) {
    ${d} itemData;
    highp uint index = (baseIndex${h}) * ${c};
    highp uint rowWidth = uint(textureSize(${a.name}, 0).x);
    int coordX = int(index % rowWidth);
    int coordY = int(index / rowWidth);\n`);let g=Kn[o.channels],y=Zn[o.channels];for(let u=0;u<m.length;++u)m[u]!==!1&&t.add(s`highp ${g} texel${s.int(u)} = texelFetch(${a.name}, ivec2(coordX + ${s.int(u)}, coordY), 0)${y};`);for(let u of v)t.add(s`itemData.${u.name} = ${Un(u,o)};`);t.add(s`return itemData;\n}`),t.add(s`${d} ${p};`)}},Xn=class{constructor(e){this._parameters=e,this.moduleId=Or(),this.namespace=`_tbb_${this.moduleId}_`}createBuilder(e,t){let i=null,a=n=>{i=this._buildTextureBackedBufferShaderCode(n)};return t?e.include(a,t):e.include(a),se(i!=null,"Valid builder expected."),i}_buildTextureBackedBufferShaderCode(e){let{namespace:t,_parameters:i}=this,{bufferUniform:a,layout:n}=i,o=i.enableNaNSupport?Gn:Yn,{vertex:l}=e,c=new qn(e,t);l.include(Mn,o),l.include(Wn,o),l.include(Nn);let d=c.getStrideName(),p=c.getStructName(),f=c.getFetchName(),h=c.getItemDataName();for(let v of[d,p,f,h])se(v.length<1024,"Identifiers do not have a valid length");return l.constants.add(d,"uint",n.texelStride),l.uniforms.add(a),l.code.add(()=>c.generateVertexCode(i)),l.main.add(()=>c.generateVertexMainCode(i)),c}};const Kn={1:s`uint`,2:s`uvec2`,4:s`uvec4`},Zn={1:s`.x`,2:s`.xy`,4:""};let Qn=class extends Yr{constructor(e,t){super(e,"usampler2D",2,(i,a,n)=>i.bindTexture(e,t(a,n)))}};function dr(r){return Xa().u32("textureElementIndex",{integer:!0}).vec2f16("lineParameters")}const es=[{type:"vec3f32",name:"position"},{type:"f32",name:"u0"}];function pr(r){let e=[...es];return r.hasVVColor?e.push({type:"f32",name:"colorFeatureAttribute"}):e.push({type:"vec4unorm8",name:"color"}),r.hasVVSize?e.push({type:"f32",name:"sizeFeatureAttribute"}):e.push({type:"f32",name:"size"}),r.hasVVOpacity&&e.push({type:"f32",name:"opacityFeatureAttribute"}),Ki()&&e.push({type:"vec4unorm8",name:"olidColor"}),r.hasAnimation&&e.push({type:"vec4f16",name:"timeStamps"}),new dn(e)}const ts=new Qn("componentTextureBuffer",r=>r.textureBuffer);function is(r){return new Xn({layout:pr(r),itemIndexExpression:"textureElementIndex",bufferUniform:ts})}const ur=1;function fr(r){let e=new cn,{attributes:t,varyings:i,vertex:a,fragment:n}=e,{applyMarkerOffset:o,draped:l,shadingEnabled:c,output:d,capType:p,stippleEnabled:f,falloffEnabled:h,wireframe:v,innerColorEnabled:m,hasAnimation:g,hasScreenSizePerspective:y,worldSized:u,imagePattern:$,useFlatJoinVarying:C}=r,z=p===2,T=f&&z,w=h||T,A=f||z,O=u&&!l,V=r.usePerspectiveCorrectStipple,L=is(r).createBuilder(e,r);a.inputs.add("position",()=>L.getTextureAttribute("position")),r.hasVVSize?a.inputs.add("sizeFeatureAttribute",()=>L.getTextureAttribute("sizeFeatureAttribute")):a.inputs.add("size",()=>L.getTextureAttribute("size")),r.hasVVOpacity&&a.inputs.add("opacityFeatureAttribute",()=>L.getTextureAttribute("opacityFeatureAttribute")),r.hasVVColor?a.inputs.add("colorFeatureAttribute",()=>L.getTextureAttribute("colorFeatureAttribute")):a.inputs.add("color",()=>L.getTextureAttribute("color")),n.include(Ha),e.include(vn,r),e.include(Cn,r),d===11?(e.varyings.add("objectAndLayerIdColorVarying","vec4"),a.code.add(s`
      vec4 getOlidColor() {
        return ${L.getTextureAttribute("olidColor")};
      }

      void forwardObjectAndLayerIdColor() {
        objectAndLayerIdColorVarying = getOlidColor();
      }
    `),n.code.add(s`void outputObjectAndLayerIdColor() {
fragColor = objectAndLayerIdColorVarying;
}`)):(a.code.add(s`void forwardObjectAndLayerIdColor() {}`),n.code.add(s`void outputObjectAndLayerIdColor() {}`));let _=o&&!l;if(_&&e.include(_n,r),oa(a,r),l&&(u||f)){let D=u?"groundMetersToScreenRatio":"planarDistanceToScreenRatio";a.uniforms.add(new nt(D,F=>1/(F.screenToPlanarDistanceRatio*(u?F.planarDistanceToGroundRatio:1))))}return O&&a.uniforms.add(qi,Xi),a.uniforms.add(la,Yi,ca,new Q("miterLimit",D=>D.join==="miter"?D.miterLimit:0)),a.constants.add("LARGE_HALF_FLOAT","float",65500),a.constants.add("EPS","float",.001),a.constants.add("NUM_JOIN_SUBDIVISIONS","float",r.numJoinSubdivisions),t.add("textureElementIndex","uint"),t.add("lineParameters","vec2"),i.add("vColor","vec4"),i.add("vpos","vec3",{invariant:!0}),i.add("vLineDistance","float"),i.add("vLineWidth","float"),C?i.add("vIsInsideJoin","int",{flat:!0}):i.add("vIsInsideJoin","float"),i.add("vStretchFactor","float"),i.add("vJoinCenterLineSDFs","vec2"),O&&i.add("vJoinLineWidths","vec2"),i.add("vSubdivisionFactor","float"),f&&i.add("vLineSizeInv","float"),w&&i.add("vLineDistanceNorm","float"),z&&(i.add("vSegmentSDF","float"),i.add("vReverseSegmentSDF","float")),a.code.add(s`vec3 perpendicular(vec3 v) {
return vec3(v.y, -v.x, 0.0);
}
float nearPlaneInterpolationFactor(float nearPlaneDistance, vec4 start, vec4 end) {
return (-nearPlaneDistance - start.z) / (end.z - start.z);
}
vec3 rotateZ(vec3 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return vec3(m * v.xy, v.z);
}`),a.code.add(s`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
posNdc.z /= posNdc.w;
return posNdc;
}`),a.code.add(s`
    void clip(
      inout vec4 pos,
      inout vec4 prev,
      inout vec4 next,
      ${b(V,s`inout float u0, inout float prevU0, inout float nextU0,`)}
      bool isStartVertex
    ) {
      float adjustedNearPlaneDistance = nearFar[0] * 0.99;

      if (pos.z > -nearFar[0]) {
        // Current position behind near plane, so we need to clip
        if (!isStartVertex) {
          if (prev.z < -nearFar[0]) {
            // Previous position in front of near plane
            float clipFactor = nearPlaneInterpolationFactor(adjustedNearPlaneDistance, prev, pos);
            ${b(V,s`u0 = mix(prevU0, u0, clipFactor); nextU0 = u0;`)}
            pos = mix(prev, pos, clipFactor);
            next = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        } else {
          if (next.z < -nearFar[0]) {
            // Next position in front of near plane
            float clipFactor = nearPlaneInterpolationFactor(adjustedNearPlaneDistance, pos, next);
            ${b(V,s`u0 = mix(u0, nextU0, clipFactor); prevU0 = u0;`)}
            pos = mix(pos, next, clipFactor);
            prev = pos;
          } else {
            pos = vec4(0.0, 0.0, 0.0, 1.0);
          }
        }
      } else {
        // Current position visible
        if (prev.z > -nearFar[0]) {
          // Previous position behind near plane
          float clipFactor = nearPlaneInterpolationFactor(adjustedNearPlaneDistance, pos, prev);
          ${b(V,s`prevU0 = mix(u0, prevU0, clipFactor);`)}
          prev = mix(pos, prev, clipFactor);
        }

        if (next.z > -nearFar[0]) {
          // Next position behind near plane
          float clipFactor = nearPlaneInterpolationFactor(adjustedNearPlaneDistance, next, pos);
          ${b(V,s`nextU0 = mix(nextU0, u0, clipFactor);`)}
          next = mix(next, pos, clipFactor);
        }
      }
    }
  `),Rt(a),a.constants.add("aaWidth","float",1),n.constants.add("aaWidth","float",1),a.main.add(s`
    vec3 position = ${L.getTextureAttribute("position")};
    float u0 = ${L.getTextureAttribute("u0")};
    ${b(u,s`
        float prevU0 = ${L.getTextureAttribute("u0",-1)};
        float nextU0 = ${L.getTextureAttribute("u0",1)};
        ${b(!l,s`
            u0 *= metersPerRenderUnit;
            prevU0 *= metersPerRenderUnit;
            nextU0 *= metersPerRenderUnit;
          `)}
      `)}

    // unpack values from vertex type
    float vertexType = abs(lineParameters.y);
    ${b(!C,s`
      bool isInsideJoin = vertexType > 8.0;
      vertexType -= isInsideJoin ? 8.0 : 0.0;
    `)}
    float lineSide = sign(lineParameters.y);
    bool isStartVertex = vertexType == 2.0 || vertexType == 4.0;
    vec3 prevPosition = ${L.getTextureAttribute("position",-1)};
    vec3 nextPosition = ${L.getTextureAttribute("position",1)};

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${Za};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = vertexType < 3.0;
  `),_&&a.main.add(s`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),e.include($n),O&&a.code.add(s`vec2 computePerspectiveInnerJoin(
vec2 leftDirection,
vec2 rightDirection,
float leftLength,
float rightLength,
float previousWidth,
float currentWidth,
float nextWidth,
float lineSide,
bool isStartVertex
) {
vec2 leftNormal = vec2(leftDirection.y, -leftDirection.x) * lineSide;
vec2 rightNormal = vec2(rightDirection.y, -rightDirection.x) * lineSide;
vec2 segmentOffset = (isStartVertex ? rightNormal : leftNormal) * currentWidth;
if (min(leftLength, rightLength) <= EPS) {
return segmentOffset;
}
vec2 leftEdge = leftDirection + leftNormal * ((currentWidth - previousWidth) / leftLength);
vec2 rightEdge = rightDirection + rightNormal * ((nextWidth - currentWidth) / rightLength);
vec2 offset = (rightNormal - leftNormal) * currentWidth;
float determinant = leftEdge.x * rightEdge.y - leftEdge.y * rightEdge.x;
float determinantScale = length(leftEdge) * length(rightEdge);
const float parallelTolerance = EPS * EPS;
if (!(abs(determinant) > parallelTolerance * determinantScale)) {
return segmentOffset;
}
float leftDistance = (offset.x * rightEdge.y - offset.y * rightEdge.x) / determinant;
float rightDistance = (offset.x * leftEdge.y - offset.y * leftEdge.x) / determinant;
if (!(leftDistance >= -leftLength && leftDistance <= 0.0 &&
rightDistance >= 0.0 && rightDistance <= rightLength)) {
return segmentOffset;
}
return leftNormal * currentWidth + leftDistance * leftEdge;
}`),O&&a.code.add(s`float perspectiveWidthAtOffset(vec2 offset, vec2 segment, float widthAtOrigin, float widthChange) {
float segmentFraction = dot(offset, segment) / max(dot(segment, segment), EPS * EPS);
return widthAtOrigin + segmentFraction * widthChange;
}`),a.code.add(s`
    vec2 computeJoinAndCapDisplacement(
      bool isJoin,
      bool isStartVertex,
      inout vec3 left,
      inout vec3 right,
      float lineSide,
      float lineWidth,
      ${b(O,"vec2 neighborWidths,")}
      float subdivisionFactor,
      float perspectiveDivisor
    ) {
      float leftLen = length(${b(O,s`left.xy`,s`left`)});
      float rightLen = length(${b(O,s`right.xy`,s`right`)});
      left = leftLen > EPS ? left / leftLen : vec3(0.0);
      right = rightLen > EPS ? right / rightLen : vec3(0.0);

      vec3 capDisplacementDir = vec3(0.0);
      vec3 joinDisplacementDir = vec3(0.0);
      float displacementLen = lineWidth;
      float miterDisplacementLen = lineWidth;
      float innerDisplacementLen = lineWidth;
      bool isOutside = false;
      ${b(O,"vec2 innerDisplacement = vec2(0.0);")}

      if (isJoin) {
        // Determine if the vertex is on the outside or inside of the join.
        isOutside = (left.x * right.y - left.y * right.x) * lineSide > 0.0;

        // Compute the miter join position first.
        ${b(O,s`
            vec2 bisector = left.xy + right.xy;
            vec2 segmentDirection = isStartVertex ? right.xy : left.xy;
            vec3 joinDirection = vec3(length(bisector) > EPS ? normalize(bisector) : segmentDirection, 0.0);
            joinDisplacementDir = perpendicular(joinDirection);

            if (leftLen > EPS && rightLen > EPS) {
              float nDotSeg = dot(joinDisplacementDir, left);
              displacementLen /= length(nDotSeg * left.xy - joinDisplacementDir.xy);
              miterDisplacementLen = displacementLen;
            }

            innerDisplacement = computePerspectiveInnerJoin(
              left.xy, right.xy, leftLen, rightLen,
              neighborWidths.x, lineWidth, neighborWidths.y,
              isOutside ? -lineSide : lineSide, isStartVertex
            );
            innerDisplacementLen = length(innerDisplacement);
          `,s`
            vec3 joinDirection = normalize(left + right);
            joinDisplacementDir = perpendicular(joinDirection);

            if (leftLen > EPS && rightLen > EPS) {
              float nDotSeg = dot(joinDisplacementDir, left);
              displacementLen /= length(nDotSeg * left - joinDisplacementDir);
              miterDisplacementLen = displacementLen;
              innerDisplacementLen = min(displacementLen, min(leftLen, rightLen) / abs(nDotSeg));

              // Limit displacement of inner vertices.
              if (!isOutside) {
                displacementLen = innerDisplacementLen;
              }
            }
          `)}

        // Compute stretch compensation for feathering.
        ${b(C,s`
          if (subdivisionFactor > 0.0) {
            vIsInsideJoin = 1;
          }
        `)}
        vSubdivisionFactor = isOutside ? subdivisionFactor : 0.5;

        if (miterDisplacementLen > miterLimit * lineWidth) {
          vec2 leftScreenDir = left.xy;
          vec2 rightScreenDir = right.xy;
          float leftScreenLen = length(leftScreenDir);
          float rightScreenLen = length(rightScreenDir);

          if (leftScreenLen > EPS && rightScreenLen > EPS) {
            leftScreenDir /= leftScreenLen;
            rightScreenDir /= rightScreenLen;

            /**
             * Feathering AA needs special considerations on join triangles because these can get stretched a lot at acute angles.
             * We use the triangle height to determine by how much they get stretched.
             */
            float theta = acos(clamp(dot(leftScreenDir, rightScreenDir), -1.0, 1.0));
            /**
             * The argument of cos here is half the angle of a join triangle.
             * We start with one triangle, and every subdivision adds another triangle.
             */
            float subdividedTriangleHeight = (innerDisplacementLen + lineWidth) * cos(theta / (2.0 + 2.0 * NUM_JOIN_SUBDIVISIONS));
            float bevelTriangleHeight = innerDisplacementLen + lineWidth * cos(theta * 0.5);
            float triangleHeight = NUM_JOIN_SUBDIVISIONS > 0.0 ? subdividedTriangleHeight : bevelTriangleHeight;
            vStretchFactor = noPerspectiveWrite(max(triangleHeight / (2.0 * lineWidth), 1.0), perspectiveDivisor);
          }
        }

        if (isOutside && displacementLen > miterLimit * lineWidth) {
          ${b(r.roundJoins,s`
              vec3 startDir = perpendicular(leftLen < EPS ? right : left);
              vec3 endDir = perpendicular(rightLen < EPS ? left : right);
              float factor = ${f?s`min(1.0, subdivisionFactor * ((NUM_JOIN_SUBDIVISIONS + 1.0) / NUM_JOIN_SUBDIVISIONS))`:s`subdivisionFactor`};

              float rotationAngle = acos(clamp(dot(startDir.xy, endDir.xy), -1.0, 1.0));
              joinDisplacementDir = rotateZ(startDir, -lineSide * factor * rotationAngle);
            `,s`
              /**
               * Convert to bevel join if miterLimit is exceeded.
               * Here vertices with a subdivisionFactor > 0 are either START vertices or
               * an additional END vertex to fix line pattern interpolation.
               * The additional vertex is considered to be the END of the previous segment.
               * However, it is pushed to the position of the START of the next segment,
               * so that the entire bevel join will be part of the first segment, pattern-wise.
               */
              vec3 startDir = perpendicular(leftLen < EPS ? right : left);
              vec3 endDir = perpendicular(rightLen < EPS ? left : right);

              ${b(f,s`joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? endDir : startDir;`,s`joinDisplacementDir = mix(startDir, endDir, subdivisionFactor);`)}
            `)}
          displacementLen = lineWidth;
        }
      } else {
        joinDisplacementDir = perpendicular(isStartVertex ? right : left);
        ${p===0?"":s`capDisplacementDir = vec3((isStartVertex ? -right : left).xy, 0.0);`}
      }

      ${b(O,s`
        if (isJoin && !isOutside) {
          return innerDisplacement;
        }
      `)}
      return (joinDisplacementDir.xy * lineSide + capDisplacementDir.xy) * displacementLen;
    }
  `),a.main.add(s`
      clip(pos, prev, next, ${b(V,s`u0, prevU0, nextU0,`)} isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec3 left = (pos.xyz - prev.xyz);
      vec3 right = (next.xyz - pos.xyz);

      float lineSize = getSize(${b(y,"clippedPos")});
      ${b(f&&y,"float patternLineSize = getSize(clippedCenter);")}
      ${b(f&&!y,"float patternLineSize = lineSize;")}

      ${b(u,s`
          ${b(l,s`float lineSizeScreen = lineSize * groundMetersToScreenRatio;`,s`
              float widthPerInverseDepth = lineSize / (metersPerRenderUnit * screenPixelSizePerDistance);
              float lineSizeScreen = widthPerInverseDepth / max(-clippedPos.z, nearFar[0]);
            `)}
          float lineWidth = lineSizeScreen * pixelRatio + aaWidth;
        `,s`
          float lineWidth = lineSize * pixelRatio + aaWidth;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${f?s`vLineSizeInv = noPerspectiveWrite(1.0 / ${u?"lineSize":"max(lineSize, 1.0)"}, pos.w);`:""}
  `),A&&a.main.add(s`
      float isEndVertex = float(!isStartVertex);
      vec3 segmentOrigin = mix(pos.xyz, prev.xyz, isEndVertex);
      vec3 segment = mix(right, left, isEndVertex);
      ${z?s`vec3 segmentEnd = mix(next.xyz, pos.xyz, isEndVertex);`:""}
    `),a.main.add(s`
    vIsInsideJoin = ${C?s`0`:s`float(isInsideJoin)`};
    vStretchFactor = 1.0;
    vSubdivisionFactor = 0.0;
    vJoinCenterLineSDFs = vec2(LARGE_HALF_FLOAT);

    ${b(O,s`
        vec2 neighborWidths = widthPerInverseDepth / max(vec2(prev.w, next.w), vec2(nearFar[0])) * pixelRatio + aaWidth;
      `)}

    vec2 displacementXY = computeJoinAndCapDisplacement(
      isJoin,
      isStartVertex,
      left,
      right,
      lineSide,
      lineWidth,
      ${b(O,"neighborWidths,")}
      lineParameters.x,
      pos.w
    );
    ${b(O,s`
        // Feathering must use each strip's width at the displaced vertex, not at the original join.
        float leftWidth = perspectiveWidthAtOffset(displacementXY, pos.xy - prev.xy, lineWidth, lineWidth - neighborWidths.x);
        float rightWidth = perspectiveWidthAtOffset(displacementXY, next.xy - pos.xy, lineWidth, neighborWidths.y - lineWidth);
        // Match vJoinCenterLineSDFs: right first, selected when vSubdivisionFactor > 0.5.
        vJoinLineWidths = noPerspectiveWrite(vec2(rightWidth, leftWidth), pos.w);
      `)}
    vec3 segmentDirection = isStartVertex ? right : left;

    /**
     * To prevent z-fighting between layers, we also adjust the z value.
     * We want to ensure that the orientation of the final triangles is the same, regardless of the line width.
     * To do so, the below formula projects the xy displacement onto the original segment direction
     * to find the z-offset necessary so the triangle orientation is independent of the width.
     */
    float displacementZ = dot(displacementXY, segmentDirection.xy) / dot(segmentDirection.xy, segmentDirection.xy) * segmentDirection.z;
    vec3 displacement = vec3(displacementXY, displacementZ);

    float lineDistNorm = noPerspectiveWrite(lineSide, pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${w?s`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xyz += displacement;
  `),a.main.add(s`if (isJoin) {
vec2 joinCenterToVertex = displacementXY;
vec2 leftCenterlineDir = left.xy;
vec2 rightCenterlineDir = right.xy;
float leftCenterlineLen = length(leftCenterlineDir);
float rightCenterlineLen = length(rightCenterlineDir);
leftCenterlineDir = leftCenterlineLen > EPS ? leftCenterlineDir / leftCenterlineLen : vec2(1.0, 0.0);
rightCenterlineDir = rightCenterlineLen > EPS ? rightCenterlineDir / rightCenterlineLen : leftCenterlineDir;
vJoinCenterLineSDFs = noPerspectiveWrite(
vec2(
dot(vec2(rightCenterlineDir.y, -rightCenterlineDir.x), joinCenterToVertex),
dot(vec2(leftCenterlineDir.y, -leftCenterlineDir.x), joinCenterToVertex)
),
pos.w
);
}`),z&&a.main.add(s`vec2 segmentDir = normalize(segment.xy);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin.xy, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd.xy, -segmentDir)), pos.w);`),f&&(l?a.main.add(s`float stippleDistanceToScreenRatio = ${u?"groundMetersToScreenRatio":"planarDistanceToScreenRatio"};`):a.main.add(s`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float stippleDistanceToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),a.main.add(s`
      float segmentLengthScreenDouble = length(segment.xy);
      float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
      float discreteStippleDistanceToScreenRatio = discretizeStippleDistanceToScreenRatio(stippleDistanceToScreenRatio);
      float segmentLengthRender = ${b(u,s`abs(mix(nextU0 - u0, u0 - prevU0, isEndVertex))`,s`length(mix(nextPosition - position, position - prevPosition, isEndVertex))`)};

      ${b(!l||u,s`
          float segmentStartRender = ${b(u,s`mix(u0, prevU0, isEndVertex)`,s`mix(u0, u0 - segmentLengthRender, isEndVertex)`)};
        `)}

      vStipplePatternStretch = stippleDistanceToScreenRatio / discreteStippleDistanceToScreenRatio;
    `),l?a.main.add(s`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteStippleDistanceToScreenRatio / stippleDistanceToScreenRatio;
float startPseudoScreen = u0 * discreteStippleDistanceToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):a.main.add(s`float startPseudoScreen = segmentStartRender * discreteStippleDistanceToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteStippleDistanceToScreenRatio;`),a.uniforms.add(new Q("stipplePatternPixelSize",D=>or(D))),a.main.add(s`
      float patternLength = patternLineSize * stipplePatternPixelSize;
      vec2 stippleDistanceLimits;

      ${b(u,s`
          stippleDistanceLimits = vec2(segmentStartRender, segmentStartRender + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          ${b($,s`
              // The v-coordinate used in case of an image pattern.
              bool isLeft = lineSide < 0.0;
              vStippleV = isLeft ? 0.0 : 1.0;
            `)}
        `,s`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          stippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(stippleDistanceLimits.x, stippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= EPS) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec3 stippleDisplacement = pos.xyz - segmentOrigin;
        float stippleDisplacementFactor = dot(segment.xy, stippleDisplacement.xy) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (stippleDistanceLimits.y - stippleDistanceLimits.x);
      }

      ${b(V,s`
          float segmentStartInverseW = 1.0 / mix(pos.w, prev.w, isEndVertex);
          float segmentEndInverseW = 1.0 / mix(next.w, pos.w, isEndVertex);
          vStipplePerspective = noPerspectiveWrite(
            vec4(stippleDistanceLimits, segmentStartInverseW, segmentEndInverseW),
            pos.w
          );
        `)}

      // Cancel out perspective-correct interpolation for screen-space stipple distances.
      vStippleLimitsAndCaps.xy = noPerspectiveWrite(stippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleLimitsAndCaps.zw = isJoin ? vec2(0.0) :
               isStartVertex ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    `)),a.main.add(s`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;
      pos.z = pos.z * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a, pos.w);

      ${v&&!l?"pos.z -= EPS * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),e.include(da,r),e.include(sr),n.include(pa),n.include(ua),n.include(fa,r),n.main.add("discardBySlice(vpos);"),n.code.add(s`
    float lineFeatheringFactor(float lineWidth, float lineDistance) {
      /**
       * Determine whether we are inside the feathering region or not, under
       * consideration of triangle stretch and the distance to the centerline.
       */
      float stretchFactor = float(vIsInsideJoin) > 0.5 ? noPerspectiveRead(vStretchFactor) : 1.0;
      float featherWidth = 2.0;
      // Keep the filter in render-target pixels, including when its two sides overlap on a subpixel stroke.
      float featherStartDistance = lineWidth - featherWidth / stretchFactor;
      float straightLineWidth = ${O?s`noPerspectiveRead(vSubdivisionFactor > 0.5 ? vJoinLineWidths.x : vJoinLineWidths.y)`:"lineWidth"};
      float straightFeatherStartDistance = straightLineWidth - featherWidth;
      float value = abs(lineDistance);
      float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
      vec2 joinCenterSDFs = noPerspectiveRead(vJoinCenterLineSDFs);
      float joinCenterDistance = abs(vSubdivisionFactor > 0.5 ? joinCenterSDFs.x : joinCenterSDFs.y);
      float straightFeather = (joinCenterDistance - straightFeatherStartDistance) / featherWidth;
      feather = float(vIsInsideJoin) > 0.5 ? max(feather, straightFeather) : feather;
      float coverage = min(lineWidth - aaWidth, 1.0);
      return clamp(1.0 - feather, 0.0, coverage);
    }
  `),n.main.add(s`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${b(w,s`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),T&&n.main.add(s`float nominalLineWidth = lineWidth - aaWidth;`),v?n.main.add(s`vec4 albedo = vec4(1.0, 0.0, 1.0, 1.0);
vec4 finalColor = albedo;`):(z&&n.main.add(s`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - ${T?"nominalLineWidth":"lineWidth"}) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < alphaCutoff) {
          discard;
        }
      `),T?n.main.add(s`vec2 stipplePosition = vec2(
min(getStippleCapDistance(), 0.0) * nominalLineWidth,
lineDistance
);
float stippleRadius = length(stipplePosition);
float stippleCapSDF = (stippleRadius - nominalLineWidth) * 0.5;
float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
float lineCoverage = min(lineFeatheringFactor(lineWidth, lineDistance), capCoverage);
float stippleAlpha = lineCoverage > 0.0 ? min(stippleCoverage, lineCoverage) / lineCoverage : 0.0;`):n.main.add(s`float stippleAlpha = getStippleAlpha(lineWidth);`),d!==11&&n.main.add(s`discardByStippleAlpha(stippleAlpha, alphaCutoff);`),n.uniforms.add(new Lt("intrinsicColor",D=>D.color)).main.add(s`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),m&&n.uniforms.add(new Lt("innerColor",D=>D.innerColor??D.color),new Q("innerWidth",(D,F)=>D.innerWidth*F.camera.pixelRatio)).main.add(s`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),n.main.add("vec4 albedo = blendStipple(color, stippleAlpha);"),h&&(n.uniforms.add(new Q("falloff",D=>D.falloff)),n.main.add(s`albedo.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),n.main.add(s`albedo.a *= ${T?"lineCoverage":"lineFeatheringFactor(lineWidth, lineDistance)"};`),g&&(a.main.add(`vec4 animatedAlphaTimeStamps = ${L.getTextureAttribute("timeStamps")};`),e.include(An,r),n.main.add("albedo.a *= animatedAlpha();")),c?(i.add("vnormal","vec3"),a.include(Ga,r),a.main.add("vnormal = getLocalUp(vpos, localOrigin);"),e.include(yn,r),n.main.add("vec4 finalColor = evaluateSceneLightingFragment(vpos, vnormal, albedo);")):n.main.add("vec4 finalColor = albedo;")),n.main.add(s`outputColorHighlightOLID(applySlice(finalColor, vpos), albedo.rgb);`),e}const rs=Object.freeze(Object.defineProperty({__proto__:null,build:fr,numRoundJoinSubdivisions:1},Symbol.toStringTag,{value:"Module"}));let At=class extends ha{constructor(r,e){super(r,e,Ka(dr())),this.shader=new ma(rs,()=>Lr(()=>Promise.resolve().then(()=>zs),void 0)),this.ignoreUnused=!0,this.primitiveType=e.wireframe?Nt.LINES:Nt.TRIANGLE_STRIP}_makePipelineState(r,e){let{output:t,hasOccludees:i}=r;return He({blending:xa(t,!1,r.emissionDimmingPass),depthTest:Sa(t),depthWrite:va(r),colorWrite:ct,stencilWrite:i?Xt:null,stencilTest:i?e?qt:ga:null,polygonOffset:Be(r)})}initializePipeline(r){if(r.occluder){let{hasOccludees:e}=r;this._occluderPipelineTransparent=He({blending:ni,polygonOffset:Be(r),depthTest:Kt,depthWrite:null,colorWrite:ct,stencilWrite:null,stencilTest:e?ba:null}),this._occluderPipelineOpaque=He({blending:ni,polygonOffset:Be(r),depthTest:e?Kt:Zt,depthWrite:null,colorWrite:ct,stencilWrite:e?$a:null,stencilTest:e?ya:null}),this._occluderPipelineMaskWrite=He({blending:null,polygonOffset:Be(r),depthTest:Zt,depthWrite:null,colorWrite:null,stencilWrite:e?Xt:null,stencilTest:e?qt:null})}return this._occludeePipeline=this._makePipelineState(r,!0),this._makePipelineState(r,!1)}getPipeline(r,e,t){if(t)return this._occludeePipeline;switch(r.occluder){case 11:return this._occluderPipelineTransparent??super.getPipeline(r,e,t);case 10:return this._occluderPipelineOpaque??super.getPipeline(r,e,t);default:r.occluder;case void 0:case null:return this._occluderPipelineMaskWrite??super.getPipeline(r,e,t)}}};At=S([_r("esri.views.3d.webgl-engine.shaders.RibbonLineTechnique")],At);let U=class extends Zi{constructor(e){super(),this.spherical=e,this.emissionSource=0,this.pbrMode=0,this.draped=!1,this.shadingEnabled=!1,this.worldSized=!1,this.hasScreenSizePerspective=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.hasOccludees=!1,this.occluder=!1,this.receiveShadows=!0,this.hasShadowHighlights=!1,this.receiveAmbientOcclusion=!0,this.receiveGlobalIllumination=!0,this.textureCoordinateType=0,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1,this.renderOccluded=!1,this.useCustomDTRExponentForWater=!1,this.hasColorTexture=!1,this.useFillLights=!1}get lineWidthRequiresPosition(){return this.hasScreenSizePerspective||this.worldSized&&!this.draped}};S([x({count:8})],U.prototype,"emissionSource",void 0),S([x({count:8})],U.prototype,"pbrMode",void 0),S([x()],U.prototype,"draped",void 0),S([x()],U.prototype,"shadingEnabled",void 0),S([x()],U.prototype,"worldSized",void 0),S([x()],U.prototype,"hasScreenSizePerspective",void 0),S([x()],U.prototype,"hasVVSize",void 0),S([x()],U.prototype,"hasVVColor",void 0),S([x()],U.prototype,"hasVVOpacity",void 0),S([x()],U.prototype,"hasOccludees",void 0),S([x()],U.prototype,"occluder",void 0),S([x()],U.prototype,"receiveShadows",void 0),S([x()],U.prototype,"hasShadowHighlights",void 0),S([x()],U.prototype,"receiveAmbientOcclusion",void 0),S([x()],U.prototype,"receiveGlobalIllumination",void 0);const to=16;let M=class extends U{constructor(){super(...arguments),this.capType=0,this.animation=2,this.polygonOffsetIndex=0,this.numJoinSubdivisions=1,this.polygonOffset=0,this.writeDepth=!1,this.transparent=!1,this.enableOITOffset=!0,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.wireframe=!1,this.imagePattern=!1,this.useFlatJoinVarying=!1}get hasAnimation(){return this.animation!==0}get usePerspectiveCorrectStipple(){return this.worldSized&&!this.draped}};S([x({count:3})],M.prototype,"capType",void 0),S([x({count:4})],M.prototype,"animation",void 0),S([x({count:16})],M.prototype,"polygonOffsetIndex",void 0),S([x({count:8})],M.prototype,"numJoinSubdivisions",void 0),S([x({count:5})],M.prototype,"polygonOffset",void 0),S([x()],M.prototype,"writeDepth",void 0),S([x()],M.prototype,"transparent",void 0),S([x()],M.prototype,"enableOITOffset",void 0),S([x()],M.prototype,"stippleEnabled",void 0),S([x()],M.prototype,"stippleOffColorEnabled",void 0),S([x()],M.prototype,"stipplePreferContinuous",void 0),S([x()],M.prototype,"roundJoins",void 0),S([x()],M.prototype,"applyMarkerOffset",void 0),S([x()],M.prototype,"falloffEnabled",void 0),S([x()],M.prototype,"innerColorEnabled",void 0),S([x()],M.prototype,"wireframe",void 0),S([x()],M.prototype,"imagePattern",void 0),S([x()],M.prototype,"useFlatJoinVarying",void 0);class ro extends pn{constructor(e,t){super(e,ns),this.produces=new Map([[2,i=>qr(i)||We(i)&&this.parameters.renderOccluded===8],[3,i=>Xr(i)],[10,i=>Gt(i)&&this.parameters.renderOccluded===8],[11,i=>Gt(i)&&this.parameters.renderOccluded===8],[4,i=>We(i)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[8,i=>We(i)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[18,i=>Kr(i)]]),this._configuration=new M(t.state.isGlobal),this._isAssumedMetalDriver=t.stage.renderer.renderContext.rctx.isAssumedMetalDriver}updateConfiguration(e){super.updateConfiguration(e),this._configuration.useFlatJoinVarying=!this._isAssumedMetalDriver;let t=this.parameters.stipplePattern!=null&&this.parameters.stippleTexture!=null&&e.output!==10,i=t&&this.parameters.isImagePattern()&&this._configuration.draped,a=this.parameters.usesWorldSizedWidth(i);this._configuration.polygonOffset=this.parameters.polygonOffset,this._configuration.stippleEnabled=t,this._configuration.stippleOffColorEnabled=t&&this.parameters.stippleOffColor!=null,this._configuration.stipplePreferContinuous=t&&this.parameters.stipplePreferContinuous,this._configuration.numJoinSubdivisions=hr(this.parameters.join,t),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins=this.parameters.join==="round",this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=this.parameters.markerParameters!=null&&os(this.parameters.markerParameters),this._configuration.polygonOffsetIndex=this.parameters.polygonOffsetIndex,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&this.parameters.innerColor!=null,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=+!!this.emissions,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective&&!a,this._configuration.worldSized=a,this._configuration.imagePattern=i}get visible(){return this.parameters.color[3]>=Me||this.parameters.stipplePattern!=null&&(this.parameters.stippleOffColor?.[3]??0)>Me}get emissions(){return this.parameters.emissiveStrength>0?this.parameters.renderOccluded===8?1:2:0}setParameters(e,t){e.animation=this.parameters.animation,super.setParameters(e,t)}intersectRayDraped({attributes:e},t,i,a,n,o,l){if(!t.options.selectionMode)return;let c=this._getLineSize(e,!0),d=i[0],p=i[1],f=fi(c,o,l,this.parameters.usesWorldSizedWidth()),h=Number.MAX_VALUE,v=0;for(let m of hi(de,Oe,this.parameters,e)){let g=d-de[0],y=p-de[1],u=Oe[0]-de[0],$=Oe[1]-de[1],C=u*g+$*y,z=u*u+$*$,T=Ct(C/z,0,1),w=u*T-g,A=$*T-y,O=w*w+A*A;O<h&&(h=O,v=m)}h<f*f&&a(n.distance,n.renderDistance,n.normal,v)}intersectRay(e,t,i,a,n,o){let{options:l,camera:c}=i;if(!l.selectionMode||!e.visible||!c)return;if(!ri(t)){zt.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");return}let d=this._getLineSize(e.attributes);this.parameters.worldSized?this._intersectRayWithWorldSizedLine(e,t,i,d,o):this._intersectRayWithScreenSizedLine(e,t,i,d,o)}_intersectRayWithScreenSizedLine(e,t,i,a,n){let{camera:o}=i,l=e.attributes,c=l.get("position").data,d=ht;tt(d,i.point);let p=a*o.pixelRatio,f=it*o.pixelRatio,h=p/2+f;X(Fe[0],d[0]-h,d[1]+h,0),X(Fe[1],d[0]+h,d[1]+h,0),X(Fe[2],d[0]+h,d[1]-h,0),X(Fe[3],d[0]-h,d[1]-h,0);for(let g=0;g<4;g++)if(!o.unprojectFromRenderScreen(Fe[g],ne[g]))return;je(o.eye,ne[0],ne[1],vt),je(o.eye,ne[1],ne[2],St),je(o.eye,ne[2],ne[3],xt),je(o.eye,ne[3],ne[0],bt);let v=Number.MAX_VALUE,m=0;for(let g of this._forEachTransformedLineSegment(R,I,c,t,Pe(this.parameters,l))){if(ee(vt,R)<0&&ee(vt,I)<0||ee(St,R)<0&&ee(St,I)<0||ee(xt,R)<0&&ee(xt,I)<0||ee(bt,R)<0&&ee(bt,I)<0)continue;let y=o.projectToRenderScreen(R,Le),u=o.projectToRenderScreen(I,_e);if(y==null||u==null)continue;if(y[2]<0&&u[2]>0){fe(te,R,I);let z=o.frustum,T=-ee(z[4],R)/Y(te,Jt(z[4]));if(oe(te,te,T),Ut(R,R,te),!o.projectToRenderScreen(R,y))continue}else if(y[2]>0&&u[2]<0){fe(te,I,R);let z=o.frustum,T=-ee(z[4],I)/Y(te,Jt(z[4]));if(oe(te,te,T),Ut(I,I,te),!o.projectToRenderScreen(I,u))continue}else if(y[2]<0&&u[2]<0)continue;y[2]=0,u[2]=0;let $=xe(y,u,mt),C=Ur($,d);if(!(C>=v)){if(this.parameters.screenSizePerspective){let z=this.computeScreenSizePerspectiveWidth($,R,I,d,o,a,f);if(C>=z*z)continue}v=C,q(xi,R),q(bi,I),m=g}}if(v<h*h){let{rayBegin:g,rayEnd:y}=i,u=Number.MAX_VALUE;if(jr(xe(xi,bi,mt),xe(g,y,gt),G)){fe(G,G,g);let $=ve(G);oe(G,G,1/$),u=$/ge(g,y)}n(u,u,G,m)}}_intersectRayWithWorldSizedLine(e,t,i,a,n){let{camera:o,ray:l,metersPerRenderUnit:c}=i,d=e.attributes,p=d.get("position").data,f=a/(2*c),h=1/0,v=0;for(let m of this._forEachTransformedLineSegment(R,I,p,t,Pe(this.parameters,d))){let g=un(R,I,f,o,l,yi);if(g!=null&&g<h&&(h=g,v=m,q(G,yi),g===0))break}h<1/0&&n(h,h,G,v)}intersectScreenPolygon(e,t,i,a){let{options:n}=i;if(!n.selectionMode||!e.visible)return null;if(!ri(t))return zt.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix"),null;let o=this._getLineSize(e.attributes);return this.parameters.worldSized?this._intersectWorldSizedPolygon(e,t,i,a,o):this._intersectScreenSizedPolygon(e,t,i,a,o)}_intersectScreenSizedPolygon(e,t,i,a,n){let{camera:o,screenPolygonPrimitiveProcessor:l}=i,c=e.attributes,d=c.get("position").data,p=it,f=p*o.pixelRatio,h=new _t(4);for(let v of this._forEachTransformedLineSegment(R,I,d,t,Pe(this.parameters,c)))for(let[m,g]of l.processLineSegment($i,R,I)){if(!Da(o,m,g,Le,_e))continue;let y=xe(Le,_e,mt),u=n/2+p;this.parameters.screenSizePerspective&&(jt(ht,Le,_e,.5),u=Math.max(u,this.computeScreenSizePerspectiveWidth(y,m,g,ht,o,n,f)/o.pixelRatio)),o.renderToScreen(Le,vi),o.renderToScreen(_e,Si),Qt(a,vi,Si,u)&&(kt(xe(m,g,gt),o.eye,ae),h.updateIfCloserFromValues(ge(o.eye,ae),v,ae,null))}return h}_intersectWorldSizedPolygon(e,t,i,a,n){let{camera:o,screenPolygonPrimitiveProcessor:l,metersPerRenderUnit:c}=i,{attributes:d}=e,p=d.get("position").data,f=n/(2*c),h=new _t(4);for(let v of this._forEachTransformedLineSegment(R,I,p,t,Pe(this.parameters,d)))for(let[m,g]of l.processLineSegment($i,R,I)){kt(xe(m,g,gt),o.eye,ae);let y=ge(o.eye,ae);h.valid&&y>=h.distance||hn(m,g,f,o,a)&&h.updateIfCloserFromValues(y,v,ae,null)}return h}intersectScreenPolygonDraped({attributes:e},t,i,a,n,o){if(!i.options.selectionMode)return null;let l=fi(this._getLineSize(e,!0),n,o,this.parameters.usesWorldSizedWidth());for(let c of hi(de,Oe,this.parameters,e,t))if(Qt(a,de,Oe,l))return new Qi(c);return null}createBufferWriter(){return new ss(dr(this.parameters),pr(this.parameters),this.parameters,this._isAssumedMetalDriver)}createGLMaterial(e){return new as(e)}validateParameters(e){e.join!=="miter"&&(e.miterLimit=0),e.markerParameters!=null&&(e.markerScale=e.markerParameters.width/e.width)}update(e){return this.parameters.hasAnimation?(this.setParameters({timeElapsed:Fr(e.time)},!1),e.dt!==0):!1}computeScreenSizePerspectiveWidth(e,t,i,a,n,o,l){let c=kr(e,a);jt(ae,t,i,c),ce(gi,ae,n.viewMatrix);let d=ve(gi),p=this.computeCameraAbsCosAngle(ae,n,this._configuration.spherical);return mi.update(p,d,this.parameters.screenSizePerspective,this.parameters.screenSizePerspectiveMinPixelReferenceSize),mi.apply(o)*n.pixelRatio/2+l}computeCameraAbsCosAngle(e,t,i){return i?Ne(G,e):X(G,0,0,1),fe(Xe,e,t.eye),Ne(Xe,Xe),Math.abs(Y(G,Xe))}_getLineSize(e,t=!1){let i=this.parameters.width;if(this.parameters.vvSize){let a=e.get("sizeFeatureAttribute").data[0];Number.isNaN(a)?t&&(i*=this.parameters.vvSize.fallback[0]):i*=Ct(this.parameters.vvSize.offset[0]+a*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else e.has("size")&&(i*=e.get("size").data[0]);return i}*_forEachTransformedLineSegment(e,t,i,a,n){let o=n?i.length-2:i.length-5;for(let l=0;l<o;l+=3){e[0]=i[l]+a[12],e[1]=i[l+1]+a[13],e[2]=i[l+2]+a[14];let c=(l+3)%i.length;t[0]=i[c]+a[12],t[1]=i[c+1]+a[13],t[2]=i[c+2]+a[14],yield l/3}}}let as=class extends za{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){let{stipplePattern:t}=this._material.parameters;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(At,e)}},ns=class extends Ta{constructor(){super(...arguments),this._width=0,this.color=wt,this.join="miter",this.cap=0,this.miterLimit=5,this.shadingEnabled=!1,this.writeDepth=!0,this.polygonOffset=0,this.polygonOffsetIndex=0,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=Ie(0),this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=Ie(0),this.endTime=Ie(1/0),this.worldSized=!1}get width(){return this.isImagePattern()?this.stipplePattern.width:this._width}set width(e){this._width=e}get transparent(){return this.color[3]<1||this.hasAnimation||this.stipplePattern!=null&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return this.animation!==0}usesWorldSizedWidth(e=this.isImagePattern()){return this.worldSized||e}isImagePattern(){return er(this.stipplePattern)&&this.stippleTexture!=null}},ss=class{constructor(e,t,i,a){this.layout=e,this.textureBufferLayout=t,this._parameters=i,this._isAssumedMetalDriver=a,this.numJoinSubdivisions=hr(this._parameters.join,this._parameters.stipplePattern!=null)}_isClosed(e){return Pe(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCountTextureBuffer(e){return e.get("position").data.length/3+(this._isClosed(e)?3:2)}elementCount(e){let t=e.get("position").indices.length/2+1,i=this._isClosed(e),a=i?2:4,n=+!i,o=i?t:t-1,l=this.numJoinSubdivisions*2+(this._isAssumedMetalDriver?8:4);return a+=(o-n)*l,a+=2,this._parameters.wireframe&&(a=2+(a-2)*4),a}write(e,t,i,a,n,o){o!=null&&this._writeTextureBuffer(e,i,o),a!=null&&this._writeVertexBuffer(e,i,a,n)}_writeTextureBuffer(e,t,i){let a=t.get("position"),n=a.data.length/3,o=this._isClosed(t),{buffer:l,offset:c}=i,d=l.getField("position",Ji),p=l.getField("u0",Te),f=l.getField("sizeFeatureAttribute",Te),h=l.getField("size",Te),v=l.getField("colorFeatureAttribute",Te),m=l.getField("color",Ht),g=l.getField("olidColor",Ht),y=l.getField("timeStamps",Br),u=l.getField("opacityFeatureAttribute",Te),$=t.get("sizeFeatureAttribute")?.data,C=t.get("size")?.data,z=t.get("colorFeatureAttribute")?.data,T=t.get("color")?.data,w=t.get("opacityFeatureAttribute")?.data,A=t.get("distanceToStart")?.data,O=t.get("timeStamps");se(d!==null,"Expected valid position field in texture buffer"),se(p!==null,"Expected valid u0 field in texture buffer");let V=0;for(let _=0;_<n;++_){this._getTransformedPosition(be,a.data,_,e),_>0&&(A==null?V+=ge(Ke,be):V=A[_]??V);let D=c+_+1;if(d.setVec(D,be),p.set(D,V),q(Ke,be),f&&f.set(D,$?.length===1?$[0]:$?.[_]??0),h&&h.set(D,C?.length===1?C[0]:C?.[_]??1),v&&v.set(D,z?.length===1?z[0]:z?.[_]??0),m)if(T!=null){let F=Math.min(_*4,T.length-4);m.setValues(D,T[F],T[F+1],T[F+2],T[F+3])}else m.setValues(D,1,1,1,1);u&&u.set(D,w?.length===1?w[0]:w?.[_]??0)}if(y!=null&&O!=null){se(O.size===4);let _=O.data;for(let D=0;D<n;++D){let F=D*4,H=c+D+1;y.set(H,0,_[F]),y.set(H,1,_[F+1]),y.set(H,2,_[F+2]),y.set(H,3,_[F+3])}}if(o){let _=c,D=c+1,F=c+2,H=c+n,Se=H+1,xr=H+2;l.copyItem(H,_),l.copyItem(D,Se),l.copyItem(F,xr),d.getVec(H,Ke),d.getVec(D,be);let br=A?.[n]??V+ge(Ke,be);p.set(Se,br)}else{let _=c,D=c+1,F=c+n,H=F+1;l.copyItem(D,_),l.copyItem(F,H)}let L=t.get("olidColor");Ki()&&L!=null&&g!=null&&Ft(L,4,g,c)}_writeVertexBuffer(e,t,i,a){let{buffer:n,offset:o}=i,{layout:l}=this,c=t.get("position"),d=c.indices,p=c.data.length/3,f=this._isClosed(t),h=p+(f?3:2);d&&d.length!==2*(p-1)&&console.warn("RibbonLineMaterial does not support indices");let v=n.getField("textureElementIndex",Jr);se(v!=null,"Missing texture buffer index field"),se(a!=null,"Using a texture layout, but the texture range for this instance was not provided");let m=a.from;se(a.numElements===h,"Expected number of elements in TextureBuffer to equal number of points");let g=new Float32Array(n.buffer),y=new Float16Array(n.buffer),u=new Uint32Array(n.buffer),$=l.stride/4,C=o*$,z=C,T=g.BYTES_PER_ELEMENT/y.BYTES_PER_ELEMENT,w=(L,_,D,F=!1)=>{let H=D+1;u[C]=m+H,C++;let Se=C*T;y[Se++]=L,y[Se++]=_+(F?Math.sign(_)*8:0),C=Math.ceil(Se/T)};C+=$;let A=0,O=0;f?(A=0,O=p):(w(1,-4,0),w(1,4,0),A=1,O=p-1);let V=this._isAssumedMetalDriver;for(let L=A;L<O;L++){w(0,-1,L),w(0,1,L),V&&(w(0,-1,L,!0),w(0,1,L,!0));let _=this.numJoinSubdivisions;for(let D=0;D<_;++D){let F=(D+1)/(_+1);w(F,-1,L,V),w(F,1,L,V)}w(1,-2,L,V),w(1,2,L,V),V&&(w(1,-2,L),w(1,2,L))}f?(w(0,-1,O),w(0,1,O)):(w(0,-5,O),w(0,5,O)),ft(g,z+$,g,z,$),C=ft(g,C-$,g,C,$),this._parameters.wireframe&&this._addWireframeVertices(n,z,C,$)}_getTransformedPosition(e,t,i,a){let n=i*3;X(e,t[n+0],t[n+1],t[n+2]),a&&ce(e,e,a)}_addWireframeVertices(e,t,i,a){let n=new Uint8Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),o=new Uint8Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,(i-t)*Float32Array.BYTES_PER_ELEMENT),l=a*Float32Array.BYTES_PER_ELEMENT,c=0,d=p=>c=ft(o,p,n,c,l);for(let p=0;p<=o.length-4*l;p+=l*2)d(p),d(p+2*l),d(p+1*l),d(p+2*l),d(p+1*l),d(p+3*l)}};function ft(r,e,t,i,a){for(let n=0;n<a;n++)t[i++]=r[e++];return i}function Pe(r,e){return r.isClosed?e.get("position").indices.length>2:!1}function fi(r,e,t,i){return i?r/(2*t)+it*e:(r/2+it)*e}function*hi(r,e,t,i,a){let n=i.get("position").data,o=Pe(t,i)?n.length-2:n.length-5,l=a?.[0]??0,c=a?.[1]??0;le(r,n[0]+l,n[1]+c);for(let d=3;d<o+3;d+=3){let p=d%n.length;le(e,n[p]+l,n[p+1]+c),yield d/3,tt(r,e)}}function os(r){return r.anchor===1&&r.hideOnShortSegments&&r.placement==="begin-end"&&r.worldSpace}function hr(r,e){let t=+!!e;switch(r){case"miter":case"bevel":return t;case"round":return ur+t}}const mi=new Pa,R=P(),I=P(),de=J(),Oe=J(),ae=P(),gi=P(),Xe=P(),te=P(),G=P(),ht=P(),Le=he(),_e=he(),vi=Ni(),Si=Ni(),xi=P(),bi=P(),yi=P(),mt=Bi(),gt=Bi(),Ke=P(),be=P(),Fe=[he(),he(),he(),he()],ne=[P(),P(),P(),P()],vt=at(),St=at(),xt=at(),bt=at(),it=4,$i=[P(),P()],ls=()=>zt.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils");function cs(r){return{cachedResult:r.cachedResult,arcade:r.arcade?{func:r.arcade.func,context:r.arcade.modules.arcadeUtils.createExecContext(null,{sr:r.arcade.context.spatialReference}),modules:r.arcade.modules}:null}}async function oo(r,e,t,i){let a=r?.expression;if(typeof a!="string")return null;let n=fs(a);if(n!=null)return{cachedResult:n};let o=await Er();Ar(t);let l=o.arcadeUtils,c=l.createSyntaxTree(a);if(!c)return null;if(l.dependsOnView(c))return i?.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0};let d=l.createFunction(c);return d?{arcade:{modules:o,func:d,context:l.createExecContext(null,{sr:e})}}:null}function ds(r,e,t){return r.arcadeUtils.arcadeFeature.createFromGraphicLikeObject(r.arcadeUtils.createArcadeGeometryFromDehydratedGeometry(e.geometry),e.attributes,t,null)}function ps(r,e){if(r!=null&&!mr(r)){if(!e||!r.arcade){ls().errorOncePerTick("Arcade support required but not provided");return}r.arcade.modules.arcadeUtils.updateExecContext(r.arcade.context,e)}}function us(r){if(r!=null){if(mr(r))return r.cachedResult;let e=r.arcade,t=e?.modules.arcadeUtils.executeFunction(e.func,e.context);return typeof t!="number"&&(r.cachedResult=0,t=0),t}return 0}function lo(r,e=!1){let t=r?.featureExpressionInfo,i=t?.expression;return!e&&i!=="0"&&(t=null),t??null}const co={cachedResult:0};function mr(r){return r.cachedResult!=null}function fs(r){return r==="0"?0:null}class gr{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=Vr(e)}get requiresSampledElevationInfo(){return this.mode!=="absolute-height"}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,t){let i=this.calculateOffsetRenderUnits(t);return this.featureExpressionInfoContext==null?e+i:i}calculateOffsetRenderUnits(e){let t=this._meterUnitOffset,i=this.featureExpressionInfoContext;return i!=null&&(t+=us(i)*this._metersPerElevationInfoUnit),t/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=Rr(e.unit)?e.unit:"meters",this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,t,i){e.arcade?(this._featureExpressionInfoContext=cs(e),this.updateFeatureExpressionFeature(t,i)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,t){let i=this.featureExpressionInfoContext;i?.arcade&&(i.cachedResult=void 0,ps(this._featureExpressionInfoContext,e.geometry?ds(i.arcade.modules,e,t):null))}static fromElevationInfo(e){let t=new gr;return e!=null&&t.setFromElevationInfo(e),t}}function st(r,e){return r.size===e?new hs(r):null}let hs=class{constructor(e){this._attribute=e}get count(){return this._attribute.indices.length}get(e,t=0){let{data:i,indices:a,stride:n}=this._attribute;return i[a[e]*n+t]}getVec(e,t){let{data:i,indices:a,size:n,stride:o}=this._attribute,l=a[e]*o;for(let c=0;c<n;c++)t[c]=i[l+c];return t}};function Di(r,e){return ot(r,e,1,st)}function Pi(r,e){return ot(r,e,2,st)}function Ze(r,e){return ot(r,e,3,st)}function Ti(r,e){return ot(r,e,4,st)}function ot(r,e,t,i){if(r.type===1){let{vertex:n}=r.buffers,o=n.layout.fields.get(e);return o==null||o.constructor.ElementCount!==t?null:n.getField(e,o.constructor)}let a=r.attributes.get(e);return a==null?null:i(a,t)}class ms extends Hi{constructor(){super(...arguments),this.primitiveVertexCount=1}computeAttachmentOrigin(e,t,i){return Ca(e,t,i)}}class E extends Zi{constructor(e,t){super(),this.spherical=e,this.polygonOffset=0,this.enableOITOffset=!1,this.screenCenterOffsetUnitsEnabled=!1,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.occludedFragmentFade=!1,this.hasOcclusionTexture=!1,this.hasFocusAreaStyle=!1,this.hasVertexColor=!0,this.hasVertexSize=!0,this.hasVertexRotation=!0,this.hasVertexUVi=!0,this.hasVertexCenterOffset=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.hasVVInstancing=!1,this.snowCover=!1,this.renderOccluded=!1,this.transparentOccluded=t}}S([x()],E.prototype,"transparentOccluded",void 0),S([x({count:5})],E.prototype,"polygonOffset",void 0),S([x()],E.prototype,"enableOITOffset",void 0),S([x()],E.prototype,"screenCenterOffsetUnitsEnabled",void 0),S([x()],E.prototype,"signedDistanceFieldEnabled",void 0),S([x()],E.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),S([x()],E.prototype,"hasVVSize",void 0),S([x()],E.prototype,"hasVVColor",void 0),S([x()],E.prototype,"hasVerticalOffset",void 0),S([x()],E.prototype,"hasScreenSizePerspective",void 0),S([x()],E.prototype,"hasRotation",void 0),S([x()],E.prototype,"debugDrawLabelBorder",void 0),S([x()],E.prototype,"depthTestEnabled",void 0),S([x()],E.prototype,"pixelSnappingEnabled",void 0),S([x()],E.prototype,"draped",void 0),S([x()],E.prototype,"occludedFragmentFade",void 0),S([x()],E.prototype,"hasOcclusionTexture",void 0),S([x()],E.prototype,"hasFocusAreaStyle",void 0),S([x()],E.prototype,"hasVertexColor",void 0),S([x()],E.prototype,"hasVertexSize",void 0),S([x()],E.prototype,"hasVertexRotation",void 0),S([x()],E.prototype,"hasVertexUVi",void 0),S([x()],E.prototype,"hasVertexCenterOffset",void 0);class uo extends ms{constructor(e,t,i=!1){super(e,Ds),this.produces=new Map([[12,a=>ke(a)&&!this.parameters.drawAsLabel&&!this._configuration.transparentOccluded],[13,a=>ke(a)&&!this.parameters.drawAsLabel&&this._configuration.transparentOccluded],[14,a=>ke(a)&&this.parameters.drawAsLabel],[18,a=>this.parameters.draped&&ke(a)]]),this._visible=!0,this._configuration=new E(t,i)}updateConfiguration(e){super.updateConfiguration(e);let{parameters:t,_configuration:i}=this,a=t.draped;i.enableOITOffset=e.enableOITOffset,i.hasSlicePlane=this.parameters.hasSlicePlane,i.hasVerticalOffset=!!this.parameters.verticalOffset,i.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,i.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",i.polygonOffset=this.parameters.polygonOffset,i.draped=a,i.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,i.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,i.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,i.hasRotation=this.parameters.hasRotation,i.hasVVSize=!!this.parameters.vvSize,i.hasVVColor=!!this.parameters.vvColor,i.occludedFragmentFade=!a&&!!this.parameters.occludedFragmentOpacity,i.hasFocusAreaStyle=this.parameters.focusAreaStyle!=null,i.depthTestEnabled=this.parameters.depthEnabled,i.hasVertexColor=this.parameters.hasVertexColor,i.hasVertexSize=this.parameters.hasVertexSize,i.hasVertexRotation=this.parameters.hasVertexRotation,i.hasVertexUVi=this.parameters.hasVertexUVi,i.hasVertexCenterOffset=this.parameters.hasVertexCenterOffset,We(e.output)&&(i.debugDrawLabelBorder=!!wa.LABELS_SHOW_BORDER),i.hasOcclusionTexture=!t.drawAsLabel&&i.transparentOccluded&&Zr(e.output)}intersectRay(e,t,i,a,n,o){let{options:{selectionMode:l,hud:c,excludeLabels:d},point:p,camera:f}=i,{parameters:h}=this;if(l&&c&&(!d||!h.isLabel)&&e.visible&&p&&f){for(let{renderScreenPosition:v,screenSize:m,pixelRatioTolerance:g,halfOutlineSize:y,rotationAngle:u,anchor:$,centerView:C}of this._forEachScreenSpaceHUDInstance(_i,e,t,f))if(Ci(p,v[0],v[1],m,g,y,u,h,$)){let z=i.ray;if(Qe[0]=p[0],Qe[1]=p[1],Qe[2]=v[2],f.unprojectFromRenderScreen(Qe,W)){let T=P();q(T,z.direction);let w=1/ve(T);oe(T,T,w);let A=ge(z.origin,W)*w,O=P();ce(O,C,f.inverseViewMatrix),o(A,A,T,-1,O)}}}}*_forEachScreenSpaceHUDInstance(e,t,i,a){let{parameters:n}=this,o=Ze(t,"position"),l=Pi(t,"size"),c=Ze(t,"normal"),d=Di(t,"rotation"),p=Ze(t,"centerOffset"),f=Ti(t,"featureAttribute"),h=n.size,v=Tt(Oi,i),m=n.centerOffsetUnits==="screen";for(let g=0;g<o.count;g++){let{scaleX:y,scaleY:u}=Ai(f?.getVec(g,Li)??null,n,a.pixelRatio);if(o.getVec(g,W),ce(W,W,i),ce(W,W,a.viewMatrix),p?p.getVec(g,B):X(B,0,0,0),!m&&(W[0]+=B[0],W[1]+=B[1],B[2]!==0)){let T=B[2];Ne(B,W),fe(W,W,oe(B,B,T))}c.getVec(g,pe),et(pe,pe,v);let{normal:$,cosAngle:C}=zi(pe,a,Ei),z=Vi(n,W,C,a,yt);if(re(W,W,$,z),a.applyProjection(W,k),k[0]>-1){m&&(B[0]||B[1])&&(k[0]+=B[0]*a.pixelRatio,B[1]!==0&&(k[1]+=yt.alignmentEvaluator.apply(B[1])*a.pixelRatio),a.unapplyProjection(k,W)),k[0]+=n.screenOffset[0]*a.pixelRatio,k[1]+=n.screenOffset[1]*a.pixelRatio,k[0]=Math.floor(k[0]),k[1]=Math.floor(k[1]),N[0]=h[0],N[1]=h[1],l!=null&&(N[0]*=l.get(g,0),N[1]*=l.get(g,1)),yt.evaluator.applyVec2(N,N);let T=0;n.textureIsSignedDistanceField&&(T=Math.min(n.outlineSize,.5*N[0])*a.pixelRatio/2),N[0]*=y,N[1]*=u,q(e.centerView,W),X(e.renderScreenPosition,k[0],k[1],k[2]),tt(e.screenSize,N),e.pixelRatioTolerance=bs*a.pixelRatio,e.halfOutlineSize=T,e.rotationAngle=n.rotation+(d?.get(g)??0),e.anchor=ai(n),yield e}}}*_forEachDrapedHUDInstance(e,t,i){let a=Ze(t,"position"),n=Pi(t,"size"),o=Di(t,"rotation"),l=Ti(t,"featureAttribute"),c=this.parameters,d=c.size;e.pixelRatioTolerance=ys*i,e.anchor=ai(c);for(let p=0;p<a.count;p++){let{scaleX:f,scaleY:h}=Ai(l?.getVec(p,Li)??null,c,i);e.x=a.get(p,0),e.y=a.get(p,1),N[0]=d[0],N[1]=d[1],n!=null&&(N[0]*=n.get(p,0),N[1]*=n.get(p,1)),e.halfOutlineSize=0,c.textureIsSignedDistanceField&&(e.halfOutlineSize=Math.min(c.outlineSize,.5*N[0])*i/2),N[0]*=f,N[1]*=h,tt(e.screenSize,N),e.rotationAngle=c.rotation+(o?.get(p)??0),yield e}}intersectRayDraped(e,t,i,a,n,o){let l=this.parameters;for(let{x:c,y:d,screenSize:p,pixelRatioTolerance:f,halfOutlineSize:h,rotationAngle:v,anchor:m}of this._forEachDrapedHUDInstance(Fi,e,o))Ci(i,c,d,p,f,h,v,l,m)&&a(n.distance,n.renderDistance,n.normal,-1)}intersectScreenPolygonDraped(e,t,i,a,n){if(!i.options.selectionMode||i.options.excludeLabels&&this.parameters.isLabel)return null;let o=this.parameters;for(let{x:l,y:c,screenSize:d,pixelRatioTolerance:p,halfOutlineSize:f,rotationAngle:h,anchor:v}of this._forEachDrapedHUDInstance(Fi,e,n))if(wi(a,l+t[0],c+t[1],d,p,f,h,o,v,!1))return new Qi(-1);return null}intersectScreenPolygon(e,t,i,a){let{options:{selectionMode:n,hud:o,excludeLabels:l},camera:c}=i,{parameters:d}=this;if(!n||!o||l&&d.isLabel||!e.visible||t==null)return null;let p=new _t(1),f=1/c.pixelRatio;for(let{renderScreenPosition:h,screenSize:v,pixelRatioTolerance:m,halfOutlineSize:g,rotationAngle:y,anchor:u,centerView:$}of this._forEachScreenSpaceHUDInstance(_i,e,t,c)){let C=ce(W,$,c.inverseViewMatrix);if(!i.screenPolygonPrimitiveProcessor?.validatePoint(C))continue;let z=h[0]*f,T=(c.fullHeight-h[1])*f;if(Pt[0]=v[0]*f,Pt[1]=v[1]*f,wi(a,z,T,Pt,m*f,g*f,y,d,u,!0)){let w=ge(c.eye,C);p.updateIfCloserFromValues(w,-1,C,null)}}return p.valid?p:null}createBufferWriter(){return new Ps(this.parameters)}createPrimitivePositionReader(e,t){se(t!=null,"HUD geometry requires instancing");let i=e.vertex.getField("position",Ji);return a=>i.getVec(0,a)}applyShaderOffsets(e,t,i,a,n,o,l,c){et($t,i,Tt(Oi,a));let d=zi($t,l,Ei),p=Ts(ve(t),l),f=Vi(this.parameters,t,d.cosAngle,l,c);re(t,t,d.normal,f+p),re(e,e,$t,f+p);let h=o+f;this._applyPolygonOffsetView(t,d,h,l,t),this._applyCenterOffsetView(t,n,t)}applyShaderOffsetsNDC(e,t,i,a,n,o){return this._applyCenterOffsetNDC(e,t,a,n),o!=null&&q(o,n),this._applyPolygonOffsetNDC(n,i,a,n),n}_applyPolygonOffsetView(e,t,i,a,n){let o=a.aboveGround?1:-1,l=Math.sign(i);l===0&&(l=o);let c=o*l;if(this.parameters.shaderPolygonOffset<=0)return q(n,e);let d=Ct(Math.abs(t.cosAngle),.01,1),p=1-Math.sqrt(1-d*d)/d/a.viewport[2];return c>0?oe(n,e,p):oe(n,e,1/p),n}_applyCenterOffsetView(e,t,i){let a=this.parameters.centerOffsetUnits!=="screen";return i!==e&&q(i,e),a&&(i[0]+=t[0],i[1]+=t[1],t[2]&&(Ne(pe,i),Ir(i,i,oe(pe,pe,t[2])))),i}_applyCenterOffsetNDC(e,t,i,a){let n=this.parameters.centerOffsetUnits!=="screen";return a!==e&&q(a,e),n||(a[0]+=t[0]/i.fullWidth*2,a[1]+=t[1]/i.fullHeight*2),a}_applyPolygonOffsetNDC(e,t,i,a){let n=this.parameters.shaderPolygonOffset;if(e!==a&&q(a,e),n){let o=i.aboveGround?1:-1,l=o*Math.sign(t);a[2]-=(l||o)*n}return a}set visible(e){this._visible=e}get visible(){let{color:e,outlineSize:t,outlineColor:i}=this.parameters,a=e[3]>=Me||t>=Me&&i[3]>=Me;return this._visible&&a}createGLMaterial(e){return new gs(e)}calculateRelativeScreenBounds(e,t,i=Ui()){return vs(this.parameters,e,t,i),i[2]=i[0]+e[0],i[3]=i[1]+e[1],i}}class gs extends qa{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(rn,e)}}function vs(r,e,t,i){i[0]=r.anchorPosition[0]*-e[0]+r.screenOffset[0]*t,i[1]=r.anchorPosition[1]*-e[1]+r.screenOffset[1]*t}function zi(r,e,t){return ce(t.normal,r,e.viewInverseTransposeMatrix),t.cosAngle=Y(t.normal,$s),t}function Ci(r,e,t,i,a,n,o,l,c){let d=vr(e,t,i,a,n,l,c,Sr);return le(ue,e,t),Re(Ee,r,ue,ki(o)),Ee[0]>d[0]&&Ee[0]<d[2]&&Ee[1]>d[1]&&Ee[1]<d[3]}function wi(r,e,t,i,a,n,o,l,c,d){let p=vr(e,t,i,a,n,l,c,Sr,d);if(le(ye,p[0],p[1]),le(Ae,p[2],p[1]),le($e,p[2],p[3]),le(Ve,p[0],p[3]),o!==0){let f=ki(o);le(ue,e,t),Re(ye,ye,ue,f),Re(Ae,Ae,ue,f),Re($e,$e,ue,f),Re(Ve,Ve,ue,f),Mr(p),Ue(p,ye),Ue(p,Ae),Ue(p,$e),Ue(p,Ve)}return Fa(r,p)?ei(r,ye,Ae,$e)||ei(r,ye,$e,Ve):!1}function vr(r,e,t,i,a,n,o,l,c=!1){let d=r-i-t[0]*o[0],p=d+t[0]+2*i,f=c?1-o[1]:o[1],h=e-i-t[1]*f,v=h+t[1]+2*i,m=n.distanceFieldBoundingBox;return n.textureIsSignedDistanceField&&m!=null&&(d+=t[0]*m[0],h+=t[1]*(c?1-m[3]:m[1]),p-=t[0]*(1-m[2]),v-=t[1]*(c?m[1]:1-m[3]),d-=a,p+=a,h-=a,v+=a),l[0]=d,l[1]=h,l[2]=p,l[3]=v,l}const yt=new Oa,W=P(),pe=P(),k=rt(),Qe=he(),$t=P(),Ee=J(),ue=J(),Oi=Ii(),B=P(),Dt=P(),Li=rt(),Sr=Ui(),ye=J(),Ae=J(),$e=J(),Ve=J(),Pt=J();class Ss{constructor(){this.renderScreenPosition=P(),this.screenSize=J(),this.centerView=P(),this.pixelRatioTolerance=0,this.halfOutlineSize=0,this.rotationAngle=0,this.anchor=J()}}class xs{constructor(){this.x=0,this.y=0,this.screenSize=J(),this.pixelRatioTolerance=0,this.halfOutlineSize=0,this.rotationAngle=0,this.anchor=J()}}const _i=new Ss,Fi=new xs,Ei={normal:P(),cosAngle:0},bs=1,ys=2,N=ji(0,0),$s=Nr(0,0,1);class Ds extends Ya{constructor(){super(...arguments),this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1,this.color=wt,this.size=Wr,this.polygonOffset=0,this.anchorPosition=ji(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=wt,this.outlineSize=0,this.distanceFieldBoundingBox=rt(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.hasVertexColor=!1,this.hasVertexSize=!1,this.hasVertexRotation=!1,this.hasVertexUVi=!1,this.hasVertexCenterOffset=!1,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.focusAreaStyle=null,this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class Ps{constructor(e){this.baseInstanceLayout=Qa,this.layout=en(e)}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,t,i,a){if(a==null)return;let{buffer:n,offset:o}=a,{position:l,normal:c,color:d,size:p,rotation:f,centerOffset:h,groundDistance:v,featureAttribute:m,uvi:g,olidColor:y}=n;Ea(i.get("position"),e,l,o),Aa(i.get("normal"),t,c,o);let u=i.get("position").indices.length;if(g){let $=i.get("uvi")?.data;if($&&$.length>=4){let[C,z,T,w]=$;for(let A=0;A<u;++A){let O=o+A;g.setValues(O,C,z,T,w)}}}if(d&&Ft(i.get("color"),4,d,o),p&&ti(i.get("size"),p,o),f&&ii(i.get("rotation"),f,o),h&&(i.get("centerOffset")?Va(i.get("centerOffset"),h,o):Je(h,o,u)),i.get("groundDistance")?ii(i.get("groundDistance"),v,o):Je(v,o,u),m&&(i.get("featureAttribute")?Ra(i.get("featureAttribute"),m,o):Je(m,o,u)),y!=null){let $=i.get("olidColor");$==null?Je(y,o,u):Ft($,4,y,o)}}writeBaseInstance(e,t){let{uv0:i}=t;ti(e.get("uv0"),i,0)}rebaseBuffers(e,t){if(t==null)return;let{buffer:i,offset:a}=t;i.copyFrom(e.vertex,0,a)}}function Ai(r,e,t){return r==null||e.vvSize==null?{scaleX:t,scaleY:t}:(La(Dt,e,r),{scaleX:Dt[0]*t,scaleY:Dt[1]*t})}function Ts(r,e){let t=e.computeRenderPixelSizeAtDistance(r)*tn;return(e.aboveGround?1:-1)*t}function Vi(r,e,t,i,a){if(!r.verticalOffset?.screenLength){let c=ve(e);return a.update(t,c,r.screenSizePerspective,r.screenSizePerspectiveMinPixelReferenceSize,r.screenSizePerspectiveAlignment,null),0}let n=ve(e),o=r.screenSizePerspectiveAlignment??r.screenSizePerspective,l=_a(i,n,r.verticalOffset,t,o,r.screenSizePerspectiveMinPixelReferenceSize);return a.update(t,n,r.screenSizePerspective,r.screenSizePerspectiveMinPixelReferenceSize,r.screenSizePerspectiveAlignment,null),l}const zs=Object.freeze(Object.defineProperty({__proto__:null,build:fr,numRoundJoinSubdivisions:ur},Symbol.toStringTag,{value:"Module"}));export{uo as A,gr as a,pn as b,Bs as c,co as d,to as e,_n as f,$n as g,Gs as h,Ys as i,yn as j,ro as k,qs as l,Qn as m,Xn as n,oo as o,vn as p,U as r,sr as t,lo as u};
