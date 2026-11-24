import{iZ as h,cw as be,X as u,Y,a1 as E,bl as J,mh as f,jT as xe,io as P,_ as k,hD as S,kp as we,eg as Ie,dV as Se,iD as ze,ko as Me,s_ as Ee,dl as Ge}from"./index-Dmtgfku4.js";import{Z as _e,y as ye,aH as je,aI as D,h as Le,aJ as K,at as Q,aK as ee,j as x,q as De,B as te,C as ae,aL as O,ay as ie,aM as ne,aN as Fe}from"./OutputColorHighlightOLID.glsl-B05J6Odi.js";import{t as N}from"./NoParameters-oniR9cXl.js";import{r as Re,a as p,e as i,z as G,h as z,g as F,x as Ce,d,u as Be,i as R,j as He}from"./getEmissions.glsl-C48L9Ou5.js";import{T as oe,g as re}from"./RenderingContext-DH--_QN5.js";import{i as le}from"./doublePrecisionUtils-CW5W7VLJ.js";let Lt=class extends _e{constructor(t){super(t),this._numLoading=0,this._disposed=!1,this._textures=t.textures,this.updateTexture(t.textureId),this._acquire(t.normalTextureId,a=>this._textureNormal=a),this._acquire(t.emissiveTextureId,a=>this._textureEmissive=a),this._acquire(t.occlusionTextureId,a=>this._textureOcclusion=a),this._acquire(t.metallicRoughnessTextureId,a=>this._textureMetallicRoughness=a)}dispose(){super.dispose(),this._texture=h(this._texture),this._textureNormal=h(this._textureNormal),this._textureEmissive=h(this._textureEmissive),this._textureOcclusion=h(this._textureOcclusion),this._textureMetallicRoughness=h(this._textureMetallicRoughness),this._disposed=!0}ensureResources(t){return this._numLoading===0?2:1}get textureBindParameters(){return new Pe(this._texture?.texture??null,this._textureNormal?.texture??null,this._textureEmissive?.texture??null,this._textureOcclusion?.texture??null,this._textureMetallicRoughness?.texture??null)}updateTexture(t){(this._texture==null||t!==this._texture.id)&&(this._texture=h(this._texture),this._acquire(t,a=>this._texture=a))}_acquire(t,a){if(t==null){a(null);return}let n=this._textures.acquire(t);if(be(n)){++this._numLoading,n.then(l=>{if(this._disposed){h(l),a(null);return}a(l)}).finally(()=>--this._numLoading);return}a(n)}},Te=class extends N{constructor(t=null){super(),this.textureEmissive=t}},Pe=class extends Te{constructor(t,a,n,l,o,r,c){super(n),this.texture=t,this.textureNormal=a,this.textureOcclusion=l,this.textureMetallicRoughness=o,this.scale=r,this.normalTextureTransformMatrix=c}},Oe=class extends Re{constructor(t){super(),this.spherical=t,this.draped=!1}};function Ne(e){e.varyings.add("linearDepth","float",{invariant:!0})}function $e(e){Ne(e),e.vertex.code.add("void forwardLinearDepth(float _linearDepth) { linearDepth = _linearDepth; }")}let Bt=class extends p{constructor(t,a,n){super(t,"mat4",1,(l,o,r)=>l.setUniformMatrix4fv(t,a(o,r),n))}};function Tt(e){e.include(ye),e.code.add(i`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      if (mode == ${i.int(3)}) {
        return externalColor;
      }

      vec3 internalMixed = internalColor * textureColor;
      if (mode == ${i.int(2)}) {
        return internalMixed;
      }

      if (mode == ${i.int(1)}) {
        return internalMixed * externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      if (mode == ${i.int(3)}) {
        return externalOpacity;
      }

      float internalMixed = internalOpacity * textureOpacity;
      if (mode == ${i.int(2)}) {
        return internalMixed;
      }

      // multiply or tint (or something invalid)
      return internalMixed * externalOpacity;
    }
  `)}let Ae=class extends p{constructor(t,a,n){super(t,"vec2",2,(l,o,r,c)=>l.setUniform2fv(t,a(o,r,c),n))}};const qe=3e5,C=5e5;let b=class extends je{constructor(){super(...arguments),this.consumes={required:["normals"]},this.produces="disabled"}get enabled(){return!this.destroying&&!this.destroyed&&this.produces===D.AMBIENT_ILLUMINATION}get _belowMaxElevation(){return(this.view.state.camera.relativeElevation??1/0)<C}get _useGlobalIllumination(){return this._belowMaxElevation&&this.view.stage.renderer.isFeatureEnabled(11)}get _useSSAO(){return this._belowMaxElevation&&this.view.stage.renderer.isFeatureEnabled(3)}_enable(){this.produces=D.AMBIENT_ILLUMINATION,this.requestRender(1)}_disable(){this.produces="disabled",this.requestRender(1)}};u([Y()],b.prototype,"consumes",void 0),u([Y()],b.prototype,"produces",void 0),b=u([E("esri.views.3d.webgl-engine.effects.AmbientIllumination")],b);function ce(e){e.include(Le),e.code.add(i`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
return texelFetch(depthTexture, iuv, 0).r;
}`),e.code.add(i`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)}function Ye(e){e.fragment.uniforms.add(new K("projInfo",t=>Je(t.camera))),e.fragment.uniforms.add(new Q("zScale",t=>Ze(t.camera))),e.fragment.code.add(i`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}function Je(e){let t=e.projectionMatrix;return t[11]===0?J(Z,2/(e.fullWidth*t[0]),2/(e.fullHeight*t[5]),(1+t[12])/t[0],(1+t[13])/t[5]):J(Z,-2/(e.fullWidth*t[0]),-2/(e.fullHeight*t[5]),(1-t[8])/t[0],(1-t[9])/t[5])}const Z=xe();function Ze(e){return e.projectionMatrix[11]===0?f(W,0,1):f(W,1,0)}const W=P();function se(){let e=new le,t=e.fragment;return e.include(ee),e.include(Ye),t.include(ce),t.include(G),t.uniforms.add(new x("radius",a=>_(a.camera))).code.add(i`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(i`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),e.outputs.add("fragOcclusion","float"),t.uniforms.add(new z("normalMap",a=>a.normalTexture),new z("depthMap",a=>a.depthTexture),new F("projScale",a=>a.projScale),new z("rnm",a=>a.noiseTexture),new De("rnmScale",(a,n)=>f(U,n.camera.fullWidth/a.noiseTexture.descriptor.width,n.camera.fullHeight/a.noiseTexture.descriptor.height)),new F("intensity",a=>a.intensity),new Q("screenSize",a=>f(U,a.camera.fullWidth,a.camera.fullHeight))).main.add(i`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragOcclusion = 1.0;
      return;
    }

    // get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 norm4 = texelFetch(normalMap, iuv, 0);
    if (norm4.a == 0.0) {
      fragOcclusion = 1.0;
      return;
    }
    vec3 norm = normalize(norm4.xyz * 2.0 - 1.0);

    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

    float sum = 0.0;
    vec3 tapPixelPos;

    vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
    // bug or deviation from CE somewhere else?
    float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

    for(int i = 0; i < ${i.int(16)}; ++i) {
      vec2 unitOffset = reflect(sphere[i], fres).xy;
      vec2 offset = vec2(-unitOffset * radius * ps);

      // don't use current or very nearby samples
      if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
        continue;
      }

      vec2 tc = vec2(gl_FragCoord.xy + offset);
      if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
      vec2 tcTap = tc / screenSize;
      float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

      tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

      sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
    }

    // output the result
    float A = max(1.0 - sum * intensity / float(${i.int(16)}), 0.0);

    // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
    A = (pow(A, 0.2) + 1.2 * pow(A, 4.0)) * INV_GAMMA;

    fragOcclusion = A;
  `),e}function _(e){return Math.max(10,e.computeScreenPixelSizeAtDistance(Math.abs(e.relativeElevation*4))*20)}const U=P(),We=Object.freeze(Object.defineProperty({__proto__:null,build:se,getRadius:_},Symbol.toStringTag,{value:"Module"}));function de(){let e=new le,t=e.fragment;return e.include(ee),t.include(ce),t.uniforms.add(new z("depthMap",a=>a.depthTexture),new Ce("tex",a=>a.colorTexture),new Ae("blurSize",a=>a.blurSize),new F("projScale",(a,n)=>{let l=n.camera.distance;return l>5e4?Math.max(0,a.projScale-(l-5e4)):a.projScale})),t.code.add(i`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${i.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.main.add(i`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${i.int(4)}; r <= ${i.int(4)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}const Ue=Object.freeze(Object.defineProperty({__proto__:null,build:de},Symbol.toStringTag,{value:"Module"}));let B=class extends te{constructor(){super(...arguments),this.shader=new ae(Ue,()=>k(()=>Promise.resolve().then(()=>St),void 0))}initializePipeline(){return oe({colorWrite:re})}};B=u([E("esri.views.3d.webgl-engine.effects.ssao.SSAOBlurTechnique")],B);const Ve="eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM";let Xe=class extends N{constructor(){super(...arguments),this.projScale=1}},ke=class extends Xe{constructor(){super(...arguments),this.intensity=1}},Ke=class extends N{};class Qe extends Ke{constructor(){super(...arguments),this.blurSize=P()}}let H=class extends te{constructor(){super(...arguments),this.shader=new ae(We,()=>k(()=>Promise.resolve().then(()=>zt),void 0))}initializePipeline(){return oe({colorWrite:re})}};H=u([E("esri.views.3d.webgl-engine.effects.ssao.SSAOTechnique")],H);const et=2;let V=class extends b{constructor(e){super(e),this._enableTime=S(0),this._passParameters=new ke,this._drawParameters=new Qe}initialize(){let e=Uint8Array.from(atob(Ve),a=>a.charCodeAt(0)),t=new we(32);t.wrapMode=33071,t.pixelFormat=6407,t.wrapMode=10497,t.hasMipmap=!0,this._passParameters.noiseTexture=new Ie(this.renderingContext,t,e),this.addHandles(Se(()=>this._useSSAO,a=>{this._enableTime=S(0),a?this._enable():this._disable()},ze))}destroy(){this._passParameters.noiseTexture=Me(this._passParameters.noiseTexture)}render(e){let t=e.find(({name:ve})=>ve==="normals"),a=t?.getTexture(),n=t?.getTexture(Ee);if(!a||!n)return;let l=this.techniques.getCompiled(H),o=this.techniques.getCompiled(B);if(!l||!o){this._enableTime=S(performance.now()),this.requestRender(1);return}this._enableTime===0&&(this._enableTime=S(performance.now()));let r=this.renderingContext,c=this.view.qualitySettings.fadeDuration,s=this.bindParameters,m=s.camera,fe=m.relativeElevation,pe=Ge((C-fe)/(C-qe),0,1),A=c>0?Math.min(c,performance.now()-this._enableTime)/c:1,ge=A*pe;this._passParameters.normalTexture=a,this._passParameters.depthTexture=n,this._passParameters.projScale=1/m.computeScreenPixelSizeAtDistance(1),this._passParameters.intensity=4*tt/_(m)**6*ge;let g=m.fullViewport[2],v=m.fullViewport[3],y=this.fboCache.acquire(g,v,"ssao input",2);r.bindFramebuffer(y.fbo),r.setViewport(0,0,g,v),r.bindTechnique(l,s,this._passParameters,this._drawParameters),r.screen.draw();let w=Math.round(g/2),I=Math.round(v/2),j=this.fboCache.acquire(w,I,"ssao blur",0);r.bindFramebuffer(j.fbo),this._drawParameters.colorTexture=y.getTexture(),f(this._drawParameters.blurSize,0,2/v),r.bindTechnique(o,s,this._passParameters,this._drawParameters),r.setViewport(0,0,w,I),r.screen.draw(),y.release();let q=this.fboCache.acquire(w,I,D.AMBIENT_ILLUMINATION,0);return r.bindFramebuffer(q.fbo),r.setViewport(0,0,g,v),r.setClearColor(1,1,1,0),r.clear(16384),this._drawParameters.colorTexture=j.getTexture(),f(this._drawParameters.blurSize,2/g,0),r.bindTechnique(o,s,this._passParameters,this._drawParameters),r.setViewport(0,0,w,I),r.screen.draw(),r.setViewport4fv(m.fullViewport),j.release(),A<1&&this.requestRender(2),q}};V=u([E("esri.views.3d.webgl-engine.effects.ssao.SSAO")],V);const tt=.5;function at(e,t){t.receiveAmbientOcclusion?(e.uniforms.add(new O("ssaoTex",a=>a.ssao?.getTexture())),e.constants.add("blurSizePixelsInverse","float",1/et),e.code.add(i`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):e.code.add(i`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}let L=class extends p{constructor(t,a,n,l){super(t,"float",0,(o,r)=>o.setUniform1fv(t,n(r),l),a)}};function it(e,t){e.uniforms.add(new L("shR",9,({lighting:a})=>a.sh.r),new L("shG",9,({lighting:a})=>a.sh.g),new L("shB",9,({lighting:a})=>a.sh.b)),e.code.add(i`vec3 calculateAmbientIrradiance(vec3 normal) {
vec3 ambientLight = 0.282095 * vec3(shR[0], shG[0], shB[0]);
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
vec4 lightingAmbientSH_R1 = vec4(shR[1], shR[2], shR[3], shR[4]);
vec4 lightingAmbientSH_G1 = vec4(shG[1], shG[2], shG[3], shG[4]);
vec4 lightingAmbientSH_B1 = vec4(shB[1], shB[2], shB[3], shB[4]);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
vec4 lightingAmbientSH_R2 = vec4(shR[5], shR[6], shR[7], shR[8]);
vec4 lightingAmbientSH_G2 = vec4(shG[5], shG[6], shG[7], shG[8]);
vec4 lightingAmbientSH_B2 = vec4(shB[5], shB[6], shB[7], shB[8]);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight;
}`),(t.pbrMode===1||t.pbrMode===2)&&e.code.add(i`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance()
{
vec3 ambientLight = 1.2 * (0.282095 * vec3(shR[0], shG[0], shB[0])) - 0.2;
return ambientLight *= skyTransmittance;
}`)}const M=new ie("mainLightDirection",e=>e.lighting.mainLight.direction),T=new ie("mainLightIntensity",e=>e.lighting.mainLight.intensity);function nt(e){e.uniforms.add(M,T),e.code.add(i`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}function ot(e){e.code.add(i`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),e.code.add(i`float integratedRadiance(float cosTheta2, float roughness) {
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),e.code.add(i`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness) {
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function ue(e){e.code.add(i`struct PBRShadingInfo
{
float NdotV;
float NdotL;
float LdotH;
float NdotUP;
float RdotUP;
float NdotAmbDir;
float NdotH_Horizon;
float NdotH;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
vec3 reflectedView;
float averageAmbientRadiance;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`)}function rt(e){e.include(ue),e.include(G),e.uniforms.add(M).code.add(i`void calculateCommonInputs(out PBRShadingInfo inputs, vec3 normal, vec3 viewDirection, vec3 upDirection, vec3 albedo) {
vec3 h = normalize(mainLightDirection - viewDirection);
inputs.NdotV = clamp(abs(dot(normal, -viewDirection)), 0.001, 1.0);
inputs.NdotUP = clamp(dot(normal, upDirection), -1.0, 1.0);
inputs.reflectedView = normalize(reflect(-viewDirection, normal));
inputs.RdotUP = clamp(dot(inputs.reflectedView, upDirection), -1.0, 1.0);
inputs.albedoLinear = linearizeGamma(albedo);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
}`),e.code.add(i`vec3 mrr = vec3(0.0, 0.6, 0.2);
void calculatePBRInputs(out PBRShadingInfo inputs, vec3 normal, vec3 viewDirection, vec3 upDirection, vec3 albedo) {
calculateCommonInputs(inputs, normal, viewDirection, upDirection, albedo);
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);
inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);
}`)}function $(e){let t=.3183098861837907;e.constants.add("PI","float",3.141592653589793),e.constants.add("LIGHT_NORMALIZATION","float",t),e.constants.add("INV_PI","float",t),e.constants.add("ONE_QUATER_PI","float",.78539816339745),e.constants.add("HALF_PI","float",1.570796326794897),e.constants.add("THREE_QUATER_PI","float",2.35619449019234),e.constants.add("TWO_PI","float",6.28318530717958),e.constants.add("PI_SQUARED","float",9.86960440108936)}function lt(e,t){e.include(G),e.include($),e.include(ue),e.include(rt),(t.pbrMode===1||t.pbrMode===2||t.pbrMode===5||t.pbrMode===6)&&(e.code.add(i`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),e.code.add(i`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),(t.pbrMode===1||t.pbrMode===2)&&(e.include(ot),e.code.add(i`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotUP);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotUP, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`)),(t.pbrMode===5||t.pbrMode===6)&&e.code.add(i`const vec3 fresnelReflectionSimplified = vec3(0.04);
void calculateSimplifiedInputs(out PBRShadingInfo inputs, vec3 normal, vec3 viewDirection, vec3 upDirection, vec3 albedo) {
calculateCommonInputs(inputs, normal, viewDirection, upDirection, albedo);
float lightness = 0.3 * inputs.albedoLinear[0] + 0.5 * inputs.albedoLinear[1] + 0.2 * inputs.albedoLinear[2];
inputs.f0 = (0.85 * lightness + 0.15) * fresnelReflectionSimplified;
inputs.f90 =  vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
}`)}function Zt(e,t){e.include($),e.code.add(i`
    struct PBRShadingWater {
      float NdotL;   // cos angle between normal and light direction
      float NdotV;   // cos angle between normal and view direction
      float NdotH;   // cos angle between normal and half vector
      float VdotH;   // cos angle between view direction and half vector
      float LdotH;   // cos angle between light direction and half vector
      float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
  `),e.code.add(i`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),e.code.add(i`float normalDistributionWater(float NdotH, float roughness) {
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),e.code.add(i`float geometricOcclusionKelemen(float LoH) {
return 0.25 / (LoH * LoH);
}`),e.code.add(i`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max) {
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze) * strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}`)}function ct(e,t){t.receiveGlobalIllumination?(e.uniforms.add(new ne("hasGlobalIlluminationTexture",a=>a.globalIllumination!=null),new O("globalIlluminationTexture",a=>a.globalIllumination?.getTexture())),e.constants.add("globalIlluminationEmissionNoiseThreshold","float",.01),e.code.add(i`vec3 readGlobalIlluminationOcclusionInverse() {
if (!hasGlobalIlluminationTexture) {
return vec3(1.0);
}
ivec2 texel = ivec2(gl_FragCoord.xy);
return vec3(texelFetch(globalIlluminationTexture, texel, 0).a);
}
vec3 readGlobalIlluminationOcclusion() {
return 1.0 - readGlobalIlluminationOcclusionInverse();
}
vec3 suppressBlackNoise(vec3 color) {
float peak = max(color.r, max(color.g, color.b));
if (peak <= globalIlluminationEmissionNoiseThreshold) {
return vec3(0.0);
}
float correctedPeak = (peak - globalIlluminationEmissionNoiseThreshold) / (1.0 - globalIlluminationEmissionNoiseThreshold);
return color * (correctedPeak / peak);
}
vec4 readGlobalIlluminationEmission() {
if (!hasGlobalIlluminationTexture) {
return vec4(0.0);
}
ivec2 texel = ivec2(gl_FragCoord.xy);
vec3 color = texelFetch(globalIlluminationTexture, texel, 0).rgb;
return vec4(suppressBlackNoise(color), 0.0);
}`)):e.code.add(i`vec3 readGlobalIlluminationOcclusionInverse() { return vec3(1.0); }
vec3 readGlobalIlluminationOcclusion() { return vec3(0.0); }
vec4 readGlobalIlluminationEmission() { return vec4(0.0); }`)}const st=.4;function dt(e){e.code.add(i`float mapChannel(float x, vec2 p) {
if((x < p.x) && (p.x == 0.0) || !(x < p.x) && (p.x == 1.0)) {
return 0.0;
}
float result = (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
return max(result, 0.0);
}`),e.code.add(i`vec3 blackLevelSoftCompression(vec3 color, float averageAmbientRadiance) {
vec2 p = vec2(0.02, 0.0075) * averageAmbientRadiance;
return vec3(mapChannel(color.x, p), mapChannel(color.y, p), mapChannel(color.z, p));
}`)}function ut(e){e.code.add(i`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`),e.code.add(i`vec3 tonemapKhronosNeutral(vec3 color) {
const float startCompression = 0.76;
const float desaturation = 0.15;
float peak = max(color.r, max(color.g, color.b));
if (peak < startCompression) {
return color;
}
float d = 1.0 - startCompression;
float newPeak = 1.0 - d * d / (peak + d - startCompression);
color *= newPeak / peak;
float g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0 );
return mix(color, vec3(newPeak), g);
}`)}function ht(e){e.constants.add("ambientBoostFactor","float",st)}const mt=new x("lightingGlobalFactor",e=>e.lighting.globalFactor);function Wt(e,t){let{pbrMode:a,spherical:n,hasColorTexture:l,receiveGlobalIllumination:o}=t;e.include(G),e.include(ct,t),e.include(at,t),a!==0&&e.include(lt,t),e.include(it,t),e.include($),e.include(ut,t);let r=!(a===2&&!l);r&&e.include(dt),ht(e),e.uniforms.add(M,mt).code.add(i`
    float additionalDirectedAmbientLight(float lightAlignment) {
      return smoothstep(0.0, 1.0, clamp(lightAlignment * 2.5, 0.0, 1.0));
    }

    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float lightAlignment = dot(${n?i`normalize(vPosWorld)`:i`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(lightAlignment * 2.5, 0.0, 1.0));
    }
  `),e.uniforms.add(T).code.add(i`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`);let c=o?"globalIlluminationOcclusion":"ssao";switch(e.constants.add("globalIlluminationDirectFactor","float",o?.55:0),e.constants.add("globalIlluminationAmbientFactor","float",o?.85:1),e.constants.add("mainLightIrradianceScale","float",o?.75:1),e.constants.add("ambientIrradianceScale","float",o?1.5:1),o&&(e.constants.add("globalIlluminationOcclusionBoost","float",1.2),e.constants.add("globalIlluminationEmissionBoost","float",2.25),e.constants.add("globalIlluminationEmissionCompressionWeight","float",.75),e.code.add(i`vec3 evaluateGlobalIlluminationOcclusion() {
return min(globalIlluminationOcclusionBoost * readGlobalIlluminationOcclusion(), 1.0);
}
vec3 evaluateGlobalIlluminationEmission(vec3 albedoLinear) {
vec3 emission = globalIlluminationEmissionBoost * (0.75 * albedoLinear + 0.25) * readGlobalIlluminationEmission().rgb;
vec3 compressedEmission = emission / (emission + 1.0);
return mix(emission, compressedEmission, globalIlluminationEmissionCompressionWeight);
}`)),a){case 0:case 4:case 3:e.include(nt),e.code.add(i`
        vec3 evaluateSceneLighting(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
                                   vec3 viewDirection, vec3 upDirection) {
          ${d(o,i`vec3 globalIlluminationOcclusion = evaluateGlobalIlluminationOcclusion();`)}

          vec3 mainLighting = mainLightIrradianceScale * applyShading(normal, shadow);
          vec3 ambientLighting = ambientIrradianceScale * calculateAmbientIrradiance(normal) * (1.0 - ${c});
          vec3 albedoLinear = linearizeGamma(albedo);

          vec3 totalLight = mainLighting + ambientLighting + additionalLight;
          totalLight = min(totalLight, vec3(PI));
          vec3 linearColor = vec3((albedoLinear / PI) * totalLight);
          ${d(o,"linearColor += evaluateGlobalIlluminationEmission(albedoLinear);")}
          return delinearizeGamma(linearColor);
        }
      `);break;case 1:case 2:e.constants.add("groundReflectance","float",o?.35:.2),e.code.add(i`
        const float fillLightIntensity = 0.25;
        const float horizonLightDiffusion = 0.4;

        vec3 evaluateSceneLighting(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
                                   vec3 viewDirection, vec3 upDirection) {
          PBRShadingInfo inputs;
          calculatePBRInputs(inputs, normal, viewDirection, upDirection, albedo);
          ${d(o,"vec3 globalIlluminationOcclusion = evaluateGlobalIlluminationOcclusion();")}
      `),t.useFillLights?e.uniforms.add(new ne("hasFillLights",s=>s.enableFillLights)):e.constants.add("hasFillLights","bool",!1),e.code.add(i`
        vec3 ambientDir = vec3(5.0 * upDirection[1] - upDirection[0] * upDirection[2], - 5.0 * upDirection[0] - upDirection[2] * upDirection[1], upDirection[1] * upDirection[1] + upDirection[0] * upDirection[0]);
        ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));

        inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;

        // Calculate the irradiance components: sun, fill lights and the sky.
        // Applying AO to both direct and ambient lighting enhances depth perception.
        // This is an artistic choice; physically, AO should only attenuate ambient lighting.
        vec3 directOcclusionFactor = mix(vec3(1.0), vec3(1.0 - ${c}), globalIlluminationDirectFactor);
        vec3 ambientOcclusionFactor = mix(vec3(1.0), vec3(1.0 - ${c}), globalIlluminationAmbientFactor);
        vec3 mainLightIrradianceComponent = mainLightIrradianceScale * inputs.NdotL * (1.0 - shadow) * mainLightIntensity * directOcclusionFactor;
        vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity * directOcclusionFactor;
        // calculate ambient irradiance for localView and additionalLight for globalView
        vec3 ambientLightIrradianceComponent = ambientIrradianceScale * calculateAmbientIrradiance(normal) * ambientOcclusionFactor + additionalLight;

        // Assemble the overall irradiance of the sky that illuminates the surface
        inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
        // Assemble the overall irradiance of the ground that illuminates the surface. for this we use the simple model that changes only the sky irradiance by the groundReflectance
        inputs.groundIrradianceToSurface = groundReflectance * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
      `),e.uniforms.add(new x("lightingSpecularStrength",s=>s.lighting.mainLight.specularStrength),new x("lightingEnvironmentStrength",s=>s.lighting.mainLight.environmentStrength)).code.add(i`
        vec3 horizonRingDir = inputs.RdotUP * upDirection - inputs.reflectedView;
        vec3 horizonRingH = normalize(horizonRingDir - viewDirection);
        inputs.NdotH_Horizon = dot(normal, horizonRingH);

        vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
        vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;

        // calculateAmbientRadiance for localView and additionalLight for global view
        vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance() * (1.0 - ${c}) + additionalLight;
        float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotUP + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));

        // Assemble the overall radiance of the sky that illuminates the surface
        inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;

        // Assemble the overall radiance of the ground that illuminates the surface. for this we use the simple model that changes only the sky radiance by the groundReflectance
        inputs.groundRadianceToSurface = 0.5 * groundReflectance * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;

        // Calculate average ambient radiance - This is used in the gamut mapping process to determine the black level for compression
        inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + groundReflectance);
      `),e.constants.add("additionalAmbientIrradianceFactor","float",.02),e.code.add(i`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 linearColor = reflectedColorComponent + additionalMaterialReflectanceComponent;

        ${d(o,"linearColor += evaluateGlobalIlluminationEmission(inputs.albedoLinear);")}

      ${r?"linearColor = blackLevelSoftCompression(linearColor, inputs.averageAmbientRadiance);":"linearColor = max(vec3(0.0), linearColor - 0.005 * inputs.averageAmbientRadiance);"}

        return delinearizeGamma(linearColor);
      }
    `);break;case 5:case 6:e.constants.add("terrainSpecularity","float",o?.35:.5),e.uniforms.add(M,T).code.add(i`
        const float roughnessTerrain = 0.5;

        vec3 evaluateSceneLighting(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
                                   vec3 viewDirection, vec3 upDirection) {
          PBRShadingInfo inputs;
          calculateSimplifiedInputs(inputs, normal, viewDirection, upDirection, albedo);

          ${d(o,"vec3 globalIlluminationOcclusion = evaluateGlobalIlluminationOcclusion();")}

          // Applying AO to both direct and ambient lighting enhances depth perception.
          // This is an artistic choice; physically, AO should only attenuate ambient lighting.
          vec3 directOcclusionFactor = mix(vec3(1.0), vec3(1.0 - ${c}), globalIlluminationDirectFactor);
          vec3 ambientOcclusionFactor = mix(vec3(1.0), vec3(1.0 - ${c}), globalIlluminationAmbientFactor);
          vec3 mainLightIrradianceComponent = mainLightIrradianceScale * (1.0 - shadow) * inputs.NdotL * mainLightIntensity * directOcclusionFactor;
          vec3 ambientLightIrradianceComponent = ambientIrradianceScale * calculateAmbientIrradiance(normal) * ambientOcclusionFactor + additionalLight;
          vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;

          vec3 indirectDiffuse = ((1.0 - inputs.NdotUP) * mainLightIrradianceComponent + (1.0 + inputs.NdotUP ) * ambientSky) * 0.5;
          vec3 diffuseColor = inputs.albedoLinear * (1.0 - inputs.f0) * indirectDiffuse / PI;

          vec3 mainLightRadianceComponent = normalDistribution(inputs.NdotH, roughnessTerrain) * mainLightIntensity;
          vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, inputs.NdotV);
          vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
          vec3 specularComponent = terrainSpecularity * specularColor * mainLightRadianceComponent;

          vec3 linearColor = diffuseColor + specularComponent;

          ${d(o,"linearColor += evaluateGlobalIlluminationEmission(inputs.albedoLinear);")}

          return delinearizeGamma(linearColor);
        }
      `);break;case 7:e.code.add(i`vec3 evaluateSceneLighting(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
vec3 viewDirection, vec3 upDirection) {
return albedo;
}`)}}function Ut(e,{spherical:t}){e.code.add("vec3 normalize4(vec4 vector){ return normalize(vector.xyz / vector.w); }"),e.code.add(t?`vec3 getLocalUp(in vec3 pos, in vec3 origin) { return normalize(pos + origin); }
         vec3 getLocalUp(in vec3 pos) { return normalize(pos); }`:`vec3 getLocalUp(in vec3 pos, in vec3 origin) { return vec3(0.0, 0.0, 1.0); }
         vec3 getLocalUp(in vec3 pos) { return vec3(0.0, 0.0, 1.0); }`),t?e.code.add(i`mat3 getTBNMatrix(in vec3 n) {
vec3 t = normalize(cross(vec3(0.0, 0.0, 1.0), n));
vec3 b = normalize(cross(n, t));
return mat3(t, b, n);
}`):e.code.add(i`mat3 getTBNMatrix(in vec3 n) {
vec3 t = vec3(1.0, 0.0, 0.0);
vec3 b = normalize(cross(n, t));
return mat3(t, b, n);
}`)}function ft(e,t){let a=Be(t.output)&&t.receiveShadows;a&&$e(e),e.vertex.code.add(i`
    void forwardLinearDepthToReadShadow() { ${d(a,"forwardLinearDepth(gl_Position.w);")} }
  `)}let pt=class extends p{constructor(t,a,n,l){super(t,"mat4",2,(o,r,c,s)=>o.setUniformMatrices4fv(t,a(r,c,s),l),n)}},gt=class extends p{constructor(t,a,n,l){super(t,"mat4",1,(o,r,c)=>o.setUniformMatrices4fv(t,a(r,c),l),n)}};function vt(e){e.uniforms.add(new gt("shadowMapMatrix",({origin:t},a)=>a.shadowMap.getShadowMapMatrices(t),4)),e.include(he)}function bt(e){e.uniforms.add(new pt("shadowMapMatrix",({origin:t},a)=>a.shadowMap.getShadowMapMatrices(t),4)),e.include(he)}function he(e){e.uniforms.add(new K("cascadeDistances",t=>t.shadowMap.cascadeDistances),new Fe("numCascades",t=>t.shadowMap.numCascades)).code.add(i`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 :
_linearDepth < cascadeDistances[2] ? 1 :
_linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
vec3 lvpos = lightSpacePosition(_worldPos, shadowMapMatrix[i]);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}class xt extends p{constructor(t,a){super(t,"sampler2DShadow",0,(n,l)=>n.bindTexture(t,a(l)))}}class X extends Oe{constructor(){super(...arguments),this.hasShadowHighlights=!1,this.receiveShadows=!0}}u([R()],X.prototype,"hasShadowHighlights",void 0),u([R()],X.prototype,"receiveShadows",void 0);function kt(e,t){t.receiveShadows&&e.fragment.include(vt),me(e,t)}function Kt(e,t){t.receiveShadows&&e.fragment.include(bt),me(e,t)}function me(e,t){e.include(ft,t);let{hasShadowHighlights:a,receiveShadows:n,spherical:l}=t;n&&(wt(e.fragment,a),e.fragment.code.add(i`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap, 0));
return readShadowMaps(uvzShadow);
}
float readShadowMap(const in vec3 _worldPos ) { return readShadowMap(_worldPos, linearDepth); }`)),e.fragment.uniforms.add(new x("lightingGlobalFactor",({lighting:o})=>o.globalFactor)).code.add(i`
      float getShadow(float additionalAmbientScale, float shadow) {
        float ambient = ${d(l,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};
        return max(ambient, shadow);
      }

      float readShadow(float additionalAmbientScale, vec3 vpos) {
        return getShadow(additionalAmbientScale, ${d(n,"readShadowMap(vpos)","0.0")});
      }
    `)}function wt(e,t,a="gl_FragCoord.xy"){t&&e.uniforms.add(new O("shadowHighlight",({shadowHighlight:n})=>n?.getTexture())),e.uniforms.add(new xt("shadowMap",({shadowMap:n})=>n.getOutput(5)??n.getOutput(7))).code.add(i`
    float readShadowMaps(const in vec3 uvzShadow) {
      if (uvzShadow.z < 0.0) {
        return 0.0;
      }

      float shadow1 = texture(shadowMap, uvzShadow);
      ${d(t,`float shadow2 = texelFetch(shadowHighlight, ivec2(${a}), 0).r;
         return shadow1 > shadow2 ? shadow1 : shadow2;`,"return shadow1;")}
    }
  `)}class It extends He{constructor(){super(...arguments),this.receiveShadows=!0}}u([R()],It.prototype,"receiveShadows",void 0);function Qt(e,t){return e.receiveShadows&&t.shadowHighlight?.getTexture()!=null}const St=Object.freeze(Object.defineProperty({__proto__:null,build:de},Symbol.toStringTag,{value:"Module"})),zt=Object.freeze(Object.defineProperty({__proto__:null,build:se,getRadius:_},Symbol.toStringTag,{value:"Module"}));export{mt as _,ht as a,T as b,Lt as c,Bt as d,$ as e,Ae as f,Kt as g,rt as h,Qt as i,kt as j,lt as k,M as l,ce as m,Tt as n,Pe as o,it as p,Zt as q,at as r,Ye as s,Ut as t,ut as u,Wt as v,qe as w,C as x};
