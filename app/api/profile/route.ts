import { NextRequest, NextResponse } from 'next/server';

// Mock database storage - in a real app, this would connect to MongoDB
const usersDB: Record<string, any> = {};
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, profileImage } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would update the user in MongoDB
    // For now, we'll simulate the database update
    if (!usersDB[userId]) {
      usersDB[userId] = {};
    }
    usersDB[userId].profileImage = profileImage;

    return NextResponse.json({
      success: true,
      message: 'Profile image updated successfully',
      profileImage: profileImage
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would fetch the user from MongoDB
    const userProfile = usersDB[userId] || { profileImage: null };

    return NextResponse.json({
      success: true,
      profileImage: userProfile.profileImage
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}