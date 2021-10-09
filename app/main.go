package main

import (
	"folktale/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func handlePing(c *gin.Context) {
	c.String(http.StatusOK, "Pong")
}

func main() {
	println("Hello World!")
	router := gin.Default()

	router.GET("api/ping", handlePing)
	router.POST("api/upload-image", controllers.HandleUploadImage)
	router.Run(":8080")
}
