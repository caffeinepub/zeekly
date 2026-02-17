import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  // Old Post type without `isDraft`
  type OldPost = {
    slug : Text;
    author : Text;
    datePublished : Int;
    title : Text;
    body : Text;
    categories : [Text];
  };

  type OldActor = {
    posts : Map.Map<Text, OldPost>;
  };

  // New Post type with `isDraft`
  type NewPost = {
    slug : Text;
    author : Text;
    datePublished : Int;
    title : Text;
    body : Text;
    categories : [Text];
    isDraft : Bool;
  };

  type NewActor = {
    posts : Map.Map<Text, NewPost>;
  };

  public func run(old : OldActor) : NewActor {
    let newPosts = old.posts.map<Text, OldPost, NewPost>(
      func(_slug, oldPost) {
        { oldPost with isDraft = false };
      }
    );
    { posts = newPosts };
  };
};
