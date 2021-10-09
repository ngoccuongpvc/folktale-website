package models

import (
	"context"
	"folktale/firebase"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

type Post struct {
	Id          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Timestamp   string `json:"timestamp"`
	Thumbnail   string `json:"thumbnail"`
	Data        string `json:"data"`
}

func GetPosts(ctx *gin.Context) ([]Post, error) {
	iter := firebase.Firestore.Collection("posts").Documents(ctx)
	var posts []Post
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		temp := doc.Data()
		post := Post{
			Id:          temp["id"].(string),
			Title:       temp["title"].(string),
			Description: temp["description"].(string),
			Timestamp:   temp["timestamp"].(string),
			Thumbnail:   temp["thumbnail"].(string),
			Data:        temp["data"].(string),
		}
		posts = append(posts, post)
		// fmt.Println(doc.Data())
	}
	return posts, nil
}

func CreatePost(ctx *gin.Context, post *Post) error {
	_, _, err := firebase.Firestore.Collection("posts").Add(context.Background(), map[string]interface{}{
		"id":          post.Id,
		"title":       post.Title,
		"description": post.Description,
		"timestamp":   post.Timestamp,
		"thumbnail":   post.Thumbnail,
		"data":        post.Data,
	})
	if err != nil {
		return err
	}
	return nil
}
