import { SkeletonTree } from "interfaces";

import buildTree from "./buildTree";
import fontLoader from "./fontLoader";

export default function (skeleton: SkeletonTree) {
  buildTree(skeleton);
  fontLoader();
}
