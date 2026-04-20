---
level: 3.5
---

# HTTPS 加密算法和加解密过程是啥？

## 题目要点

HTTPS 通过结合非对称加密和对称加密来确保通信的安全。非对称加密用于握手过程中的身份验证和密钥交换，而对称加密则用于实际的数据传输。哈希算法用于确保数据的完整性。这个加解密过程确保了数据在客户端和服务器之间的安全传输。

## 参考答案

HTTPS 使用 SSL/TLS 协议来加密传输的数据，确保数据的机密性和完整性。HTTPS 的加解密过程主要包括以下几个步骤和算法：

### **1. 加密算法和密钥类型**

- **对称加密算法**：使用相同的密钥进行加密和解密。常见的对称加密算法包括 AES（Advanced Encryption Standard）和 3DES（Triple Data Encryption Standard）。
- **非对称加密算法**：使用一对密钥（公钥和私钥），公钥用于加密，私钥用于解密。常见的非对称加密算法包括 RSA（Rivest-Shamir-Adleman）和 ECC（Elliptic Curve Cryptography）。
- **哈希算法**：用于生成数据的摘要，以确保数据完整性。常见的哈希算法包括 SHA-256（Secure Hash Algorithm 256-bit）和 MD5（Message Digest Algorithm 5，虽然 MD5 不再安全）。

### **2. SSL/TLS 握手过程**

#### **握手阶段**

1. **客户端发起连接**
   - 客户端发送一个 “ClientHello” 消息，包含客户端支持的 TLS 版本、加密套件（加密算法组合）、压缩方法和其他信息。

2. **服务器响应**
   - 服务器回应一个 “ServerHello” 消息，选择客户端支持的加密套件和 TLS 版本。
   - 服务器发送其数字证书给客户端。数字证书包含服务器的公钥，由证书颁发机构（CA）签名。

3. **证书验证**
   - 客户端验证服务器的数字证书的有效性和真实性。如果证书有效，客户端继续执行。
   - 客户端生成一个随机的“pre-master secret”并用服务器的公钥加密，然后发送给服务器。这个“pre-master secret”将在后续的步骤中用于生成对称加密密钥。

4. **密钥交换**
   - 服务器使用其私钥解密“pre-master secret”并生成一个对称加密密钥（session key）。
   - 客户端和服务器使用“pre-master secret”生成相同的对称加密密钥（session key），用于加密后续的通信数据。

5. **完成握手**
   - 双方用对称加密密钥加密并交换“Finished”消息，表示握手过程完成。
   - 从这一点开始，客户端和服务器使用对称加密密钥加密和解密数据。

### **3. 数据加密和传输**

- **对称加密**：客户端和服务器使用之前生成的对称加密密钥来加密和解密数据。对称加密算法确保数据在传输过程中是机密的。
- **数据完整性**：除了加密，TLS 还使用消息认证码（MAC）来确保数据在传输过程中没有被篡改。常见的 MAC 算法包括 HMAC（Hash-based Message Authentication Code）。

### **4. 连接关闭**

- **优雅关闭**：当通信完成时，客户端和服务器通过发送“close_notify”消息来优雅地关闭连接，确保所有的数据都被正确传输。

### **常见的加密套件**

在 TLS 握手过程中，客户端和服务器会协商一个加密套件（cipher suite），这是一个加密算法的组合。常见的加密套件包括：

- **TLS_AES_128_GCM_SHA256**：使用 AES 进行对称加密，GCM（Galois/Counter Mode）用于加密模式，SHA-256 用于消息认证。
- **TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384**：使用 ECDHE（Elliptic Curve Diffie-Hellman Ephemeral）进行密钥交换，RSA 进行身份验证，AES-256-GCM 进行对称加密，SHA-384 进行消息认证。
