import seo from "../objects/seo";
import settings from "../singletons/settings";
import author from "./author";
import blockContent from "./blockContent";
import category from "./category";
import post from "./post";

export const schemaTypes = [post, author, category, blockContent, seo, settings];
