---
title: "Next.js - JWT"
date: 2025-01-31
categories: ["Developer"]
tags: ["Next.js", "JWT"]
---

# Next.js app with JWT-based authentication and a basic security setup

Here's how you can create a simple **Next.js** app with **JWT-based authentication** and a basic security setup.

### Steps Overview:
1. **Initialize a Next.js app**
2. **Set up authentication with JWT**
3. **Create login and protected routes**
4. **Add security features**

### 1. Initialize Next.js App

Run the following commands to initialize a Next.js app:

```bash
npx create-next-app@latest my-nextjs-jwt-app
cd my-nextjs-jwt-app
npm install
```

### 2. Install Dependencies

You need additional packages for handling JWT, user authentication, and securing the app:

```bash
npm install jsonwebtoken bcryptjs next-auth
```

### 3. Create Authentication Logic with JWT

- Create a utility for handling JWT.

#### `lib/jwt.js`

```js
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export const signToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    secretKey, 
    { expiresIn: '1h' } 
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
```

### 4. Setup API Routes for Login and Protected Data

#### `pages/api/login.js`

This API route will validate the user, and upon successful validation, will generate a JWT token.

```js
import { signToken } from '../../lib/jwt';
import bcrypt from 'bcryptjs';

// Mock user data
const users = [
  { id: 1, email: 'test@example.com', password: bcrypt.hashSync('password', 8) }
];

export default function handler(req, res) {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user);
  return res.status(200).json({ token });
}
```

#### `pages/api/protected.js`

This API route is protected. It will only return data if the provided JWT token is valid.

```js
import { verifyToken } from '../../lib/jwt';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  return res.status(200).json({ message: 'This is protected data' });
}
```

### 5. Create Login Page

Now, let's create a simple login form where users can enter their email and password, and receive a JWT upon success.

#### `pages/login.js`

```js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/protected');
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
```

### 6. Create Protected Page

This page will fetch data from the protected API route using the JWT token stored in `localStorage`.

#### `pages/protected.js`

```js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data.message);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    };

    fetchProtectedData();
  }, [router]);

  return (
    <div>
      <h1>Protected Page</h1>
      {error ? <p>{error}</p> : <p>{data}</p>}
    </div>
  );
}
```

### 7. Security Enhancements

- **Environment Variables**: Store the JWT secret and other sensitive information in a `.env.local` file.

```bash
JWT_SECRET=your-strong-secret-key
```

- **CORS**: You might want to add Cross-Origin Resource Sharing (CORS) policies for enhanced security.

- **Helmet.js**: You can add basic HTTP security headers using `helmet` by installing it and creating a middleware in your app.

```bash
npm install helmet
```

Create a file `middleware.js`:

```js
import helmet from 'helmet';

export default function securityMiddleware(req, res, next) {
  helmet()(req, res, next);
}
```

Then, apply the middleware in your `api` routes.

### Final Remarks

This setup provides a basic Next.js app with JWT-based login and protected routes. You can extend it by connecting to a database, implementing refresh tokens, and adding more robust security measures like rate-limiting, OAuth integration, etc.

Let me know if you need further customizations!