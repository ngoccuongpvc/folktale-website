package controllers

import (
	"fmt"
	"folktale/firebase"
	"io"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
)

var validExtensions = map[string]bool{"png": true, "jpg": true, "jpeg": true}

type ImageUploader struct {
	bucket *storage.BucketHandle
}

func isValidImageExtension(filename string) bool {
	fileExtension := strings.Split(filename, ".")
	if validExtensions[fileExtension[len(fileExtension)-1]] {
		return true
	}
	return false
}

func HandleUploadImage(c *gin.Context) {
	file, header, err := c.Request.FormFile("upload")
	if err != nil {
		c.JSON(404, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	if file == nil {
		c.JSON(404, gin.H{
			"success": false,
			"message": "file not found",
		})
		return
	}
	if header.Header == nil {
		c.JSON(404, gin.H{
			"success": false,
			"message": "filename not available",
		})
		return
	}
	filename := header.Filename

	filename = fmt.Sprintf("%d-%s", time.Now().Unix(), filename)
	if !isValidImageExtension(filename) {
		c.JSON(200, gin.H{
			"success": false,
			"message": "This file extension is not allowed",
		})
		return
	}

	wc := firebase.Bucket.Object(filename).NewWriter(&gin.Context{})
	_, err = io.Copy(wc, file)
	if err != nil {
		c.JSON(404, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	if err := wc.Close(); err != nil {
		c.JSON(404, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"success": true,
		"url":     fmt.Sprintf("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", "folktale-8a942.appspot.com", filename),
	})
}
