<script lang="ts">
import { defineComponent, h } from "vue";
import type { VNode } from "vue";
import FolderIcon from "../icons/Folder.vue";
import GitIcon from "../icons/Git.vue";
import FileIcon from "../icons/File.vue";
import LicenseIcon from "../icons/License.vue";
import JsonIcon from "../icons/Json.vue";
import YamlIcon from "../icons/Yaml.vue";
import MarkdownIcon from "../icons/Md.vue";

export default defineComponent({
  props: {
    type: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let compts: VNode;
    if (props.type === 1) {
      compts = h(FolderIcon);
    } else if (props.type === 2) {
      compts = h(LicenseIcon);
    } else if (props.type === 3) {
      compts = h(GitIcon);
    } else if (props.type === 4) {
      compts = h(JsonIcon);
    } else if (props.type === 5) {
      compts = h(YamlIcon);
    } else if (props.type === 6) {
      compts = h(MarkdownIcon);
    } else {
      compts = h(FileIcon);
    }
    return () => compts;
  },
});
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  display: inline-block;
}
</style>
