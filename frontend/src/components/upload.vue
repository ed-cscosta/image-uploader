<template>
  <vue-dropzone
    id="customdropzone"
    :options="dropzoneOptions"
    :useCustomSlot="true"
    :include-styling="false"
    v-on:vdropzone-thumbnail="thumbnail"
    v-on:vdropzone-upload-progress="progress"
    @vdropzone-complete="complete"
  >
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">Arraste os ficheiros...</h3>
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
export default {
  data: function() {
    return {
      dropzoneOptions: {
        url: "http://localhost:3333/posts",
        maxFilesize: 2,
        previewTemplate: this.template()
      }
    };
  },
  methods: {
    template: function() {
      return `<div class="dz-preview dz-file-preview">
                <div class="dz-image" data-dz-thumbnail-bg></div>
                <div class="dz-details">
                    <div class="dz-filename"><span data-dz-name></span></div>
                    <div class="dz-size" data-dz-size></div>
                </div>
                <div class="dz-progress">
                  <svg viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52.5" fill="none" stroke="#55B7FE" stroke-width="15" stroke-dasharray="339.292" stroke-dashoffset="339.292" />
                  </svg>
                  <div class="dz-finished-state dz-success-mark"></div>
                   <div class="dz-finished-state dz-error-mark"></div>
                </div>
                
            </div>
        `;
    },
    progress(file, progress) {
      if (file.previewElement) {
        const ref = file.previewElement.querySelector(
          ".dz-progress svg circle"
        );
        ref.style.strokeDashoffset = 339.292 * (1 - progress / 100);
      }
    },
    complete(response) {
      if (response.previewElement) {
        if (response.status == "error") {
          response.previewElement.querySelector(
            ".dz-error-mark"
          ).style.display = "flex";
        } else {
          response.previewElement.querySelector(
            ".dz-success-mark"
          ).style.display = "flex";
        }
        response.previewElement.querySelector(".dz-progress svg").remove();
      }
    },
    thumbnail: function(file, dataUrl) {
      var j, len, ref, thumbnailElement;
      if (file.previewElement) {
        file.previewElement.classList.remove("dz-file-preview");
        ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
        for (j = 0, len = ref.length; j < len; j++) {
          thumbnailElement = ref[j];
          thumbnailElement.alt = file.name;
          thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
        }
        return setTimeout(
          (function() {
            return function() {
              return file.previewElement.classList.add("dz-image-preview");
            };
          })(this),
          1
        );
      }
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  }
};
</script>
