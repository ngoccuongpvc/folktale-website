package firebase_storage

import (
	"context"
	"io"
	"log"
	"os"

	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var bucket *storage.BucketHandle

func init() {
	config := &firebase.Config{
		StorageBucket: "folktale-8a942.appspot.com",
	}
	opt := option.WithCredentialsFile("serviceAccount.json")
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalln(err)
	}
	client, err := app.Storage(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	bucket, err = client.DefaultBucket()

	if err != nil {
		log.Fatalln(err)
	}
	// UploadImage("image.png")
}

func UploadImage(url string) {
	imageFile, err := os.Open(url)
	if err != nil {
		log.Fatal(err.Error())
	}
	wc := bucket.Object("test.png").NewWriter(context.Background())
	_, err = io.Copy(wc, imageFile)
	if err != nil {
		log.Fatal(err.Error())
	}

	println(wc.Metadata)
	print("ok")

	if err := wc.Close(); err != nil {
		log.Fatal(err.Error())
	}

}
