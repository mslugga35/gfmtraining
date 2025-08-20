import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const f = createUploadthing();
const prisma = new PrismaClient();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Video upload route for training videos
  videoUploader: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { userId } = await auth();

      // If you throw, the user will not be able to upload
      if (!userId) throw new Error("Unauthorized");

      // Get user from database to check permissions
      const user = await prisma.user.findUnique({
        where: { clerkId: userId }
      });

      if (!user) throw new Error("User not found");

      // Only admins can upload videos
      if (user.role !== 'ADMIN') {
        throw new Error("Forbidden - Admin access required");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, userRole: user.role };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // You can store the file URL in your database here
      // The file.url is the permanent URL to the uploaded file
      
      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size
      };
    }),

  // Image upload route for thumbnails and profile pictures
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const { userId } = await auth();

      if (!userId) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: { clerkId: userId }
      });

      if (!user) throw new Error("User not found");

      return { userId: user.id, userRole: user.role };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size
      };
    }),

  // Media gallery upload route for general media
  mediaUploader: f({ 
    image: { maxFileSize: "16MB", maxFileCount: 10 },
    video: { maxFileSize: "256MB", maxFileCount: 5 }
  })
    .middleware(async ({ req }) => {
      const { userId } = await auth();

      if (!userId) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: { clerkId: userId }
      });

      if (!user) throw new Error("User not found");

      // Only admins can upload to media gallery
      if (user.role !== 'ADMIN') {
        throw new Error("Forbidden - Admin access required");
      }

      return { userId: user.id, userRole: user.role };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Media upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      try {
        // Automatically create media gallery entry
        const mediaType = file.type.startsWith('image/') ? 'IMAGE' : 'VIDEO';
        
        const mediaEntry = await prisma.mediaGallery.create({
          data: {
            title: file.name,
            mediaType: mediaType as any,
            mediaUrl: file.url,
            uploadedById: metadata.userId,
            isPublic: true,
            category: 'general',
            tags: []
          }
        });

        console.log("Created media gallery entry:", mediaEntry.id);
      } catch (error) {
        console.error("Error creating media gallery entry:", error);
      }

      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size
      };
    }),

  // Product image upload route for shop items
  productImageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const { userId } = await auth();

      if (!userId) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: { clerkId: userId }
      });

      if (!user) throw new Error("User not found");

      // Only admins can upload product images
      if (user.role !== 'ADMIN') {
        throw new Error("Forbidden - Admin access required");
      }

      return { userId: user.id, userRole: user.role };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      return { 
        uploadedBy: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;