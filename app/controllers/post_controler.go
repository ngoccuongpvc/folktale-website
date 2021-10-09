package controllers

import (
	"fmt"
	"folktale/models"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
)

func HandleGetPost(c *gin.Context) {
	posts, err := models.GetPosts(c)

	if err != nil {
		c.JSON(200, gin.H{
			"success": false,
			"message": err.Error(),
		})
	}
	c.JSON(200, gin.H{
		"success": true,
		"data":    posts,
	})
}

func HandleCreatePost(c *gin.Context) {
	title := c.PostForm("title")
	description := c.PostForm("description")
	thumbnail := c.PostForm("thumbnail")
	data := c.PostForm("data")

	if len(title) == 0 || 0 == len(description) || 0 == len(thumbnail) || 0 == len(data) {
		c.JSON(200, gin.H{
			"success": false,
			"message": "Data is missing",
		})
		return
	}

	id := RandomString(10)
	timestamp := fmt.Sprintf("%d", time.Now().Unix())

	post := models.Post{
		Id:          id,
		Title:       title,
		Description: description,
		Thumbnail:   thumbnail,
		Data:        data,
		Timestamp:   timestamp,
	}

	err := models.CreatePost(c, &post)
	if err != nil {
		c.JSON(200, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"success": true,
		"message": "Success",
	})
}

func RandomString(n int) string {
	rand.Seed(time.Now().UnixNano())
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}
