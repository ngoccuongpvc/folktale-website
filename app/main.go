package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	firebase_storage "folktale/firebase_storage"

	"github.com/gin-gonic/gin"
)

func handlePing(c *gin.Context) {
	c.String(http.StatusOK, "Pong")
}

func handleUploadImage(c *gin.Context) {
	file, header, err := c.Request.FormFile("upload")
	filename := header.Filename
	fmt.Println(header.Filename)
	out, err := os.Create("/tmp/" + filename)
	if err != nil {
		log.Fatal(err)
	}
	println(http.DetectContentType([]byte(filename)))
	defer out.Close()
	firebase_storage.UploadImage("/tmp/" + filename)
	_, err = io.Copy(out, file)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	println("Hello World!")
	router := gin.Default()

	router.GET("api/ping", handlePing)
	router.POST("api/upload-image", handleUploadImage)
	router.Run()
}
