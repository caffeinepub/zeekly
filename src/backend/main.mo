import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Post = {
    slug : Text;
    author : Text;
    datePublished : Int;
    title : Text;
    body : Text;
    categories : [Text];
    isDraft : Bool;
  };

  module Post {
    public func compare(post1 : Post, post2 : Post) : Order.Order {
      if (post1.datePublished < post2.datePublished) { return #less };
      if (post1.datePublished > post2.datePublished) { return #greater };
      #equal;
    };
  };

  let posts = Map.empty<Text, Post>();

  public shared ({ caller }) func newPost(slug : Text, author : Text, datePublished : Int, title : Text, body : Text, categories : [Text], isDraft : Bool) : async () {
    posts.add(slug, { slug; author; datePublished; title; body; categories; isDraft });
  };

  public query ({ caller }) func getPost(slug : Text) : async ?Post {
    posts.get(slug);
  };

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.values().toArray().sort();
  };

  public query ({ caller }) func getPostsByCategory(category : Text) : async [Post] {
    posts.values().filter(func(p) { p.categories.any(func(c) { c == category }) }).toArray().sort();
  };

  public query ({ caller }) func getPostCount() : async Nat {
    posts.size();
  };

  public query ({ caller }) func getDraftPosts() : async [Post] {
    posts.values().filter(func(p) { p.isDraft }).toArray().sort();
  };
};
