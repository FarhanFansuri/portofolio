export const vulnerabilityCases = [
  {
    slug: 'sqli-login-dvwa',
    title: 'SQL Injection on Login Form',
    type: 'SQL Injection',
    difficulty: 'Easy',
    tags: ['Web', 'Authentication', 'DVWA'],
    summary:
      'Bypass login dengan payload SQL sederhana pada environment lab DVWA untuk menunjukkan risiko query yang tidak diparameterisasi.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Case study ini mendokumentasikan SQL Injection pada form login yang tidak menggunakan prepared statement. Semua pengujian dilakukan pada DVWA local lab.',
          },
          {
            kind: 'alert',
            level: 'warning',
            text:
              'Etika: target hanya lab pribadi. Tidak ada pengujian ke sistem publik atau tanpa izin.',
          },
        ],
      },
      {
        id: 'target-info',
        title: 'Target Info',
        blocks: [
          {
            kind: 'list',
            ordered: false,
            items: [
              'Platform: DVWA (Damn Vulnerable Web Application)',
              'Environment: Docker local, isolated network',
              'Scope: Modul login pada security level Low',
              'Data: Dummy user, tanpa data sensitif real',
            ],
          },
        ],
      },
      {
        id: 'vulnerability-details',
        title: 'Vulnerability Details',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Input username dan password langsung dikonkatenasi ke query SQL. Hal ini memungkinkan attacker memodifikasi logika query melalui karakter khusus.',
          },
          {
            kind: 'code',
            language: 'sql',
            code: "SELECT * FROM users WHERE username = '" + '$username' + "' AND password = '" + '$password' + "';",
          },
        ],
      },
      {
        id: 'exploitation-steps',
        title: 'Exploitation Steps',
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: [
              'Buka halaman login DVWA pada browser.',
              "Masukkan payload: admin' OR '1'='1 pada field username.",
              'Isi password dengan value bebas.',
              'Submit form dan amati perubahan response (auth bypass).',
            ],
          },
        ],
      },
      {
        id: 'proof-of-concept',
        title: 'Proof of Concept (PoC)',
        blocks: [
          {
            kind: 'code',
            language: 'sql',
            code: "admin' OR '1'='1",
          },
          {
            kind: 'code',
            language: 'http',
            code: 'POST /dvwa/login.php HTTP/1.1\\nHost: localhost\\nContent-Type: application/x-www-form-urlencoded\\n\\nusername=admin%27%20OR%20%271%27%3D%271&password=test&Login=Login',
          },
          {
            kind: 'alert',
            level: 'info',
            text:
              'Contoh request/response telah disanitasi dan tidak memuat kredensial asli.',
          },
        ],
      },
      {
        id: 'impact',
        title: 'Impact',
        blocks: [
          {
            kind: 'list',
            ordered: false,
            items: [
              'Authentication bypass',
              'Unauthorized access ke data user',
              'Potensi privilege escalation',
            ],
          },
        ],
      },
      {
        id: 'mitigation',
        title: 'Mitigation',
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: [
              'Gunakan prepared statements / parameterized queries.',
              'Lakukan server-side validation pada seluruh input.',
              'Terapkan least privilege untuk akun database.',
              'Aktifkan logging untuk anomali autentikasi.',
            ],
          },
          {
            kind: 'code',
            language: 'javascript',
            code: 'const stmt = db.prepare(\'SELECT * FROM users WHERE username = ? AND password_hash = ?\');\\nstmt.execute([username, passwordHash]);',
          },
        ],
      },
      {
        id: 'references',
        title: 'References',
        blocks: [
          {
            kind: 'references',
            items: [
              {
                label: 'OWASP Top 10 - Injection',
                href: 'https://owasp.org/Top10/A03_2021-Injection/',
              },
              {
                label: 'PortSwigger SQL Injection Guide',
                href: 'https://portswigger.net/web-security/sql-injection',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'stored-xss-profile-juice-shop',
    title: 'Stored XSS on Profile Bio',
    type: 'XSS',
    difficulty: 'Medium',
    tags: ['Web', 'Client-Side', 'OWASP Juice Shop'],
    summary:
      'Stored XSS ditemukan pada input profile bio tanpa sanitasi output yang benar. Payload tereksekusi ulang saat profile dirender.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Vulnerability ini terjadi karena user-generated content disimpan dan ditampilkan kembali tanpa output encoding yang tepat.',
          },
        ],
      },
      {
        id: 'target-info',
        title: 'Target Info',
        blocks: [
          {
            kind: 'list',
            ordered: false,
            items: [
              'Platform: OWASP Juice Shop (legal vulnerable app)',
              'Environment: Local docker image',
              'Scope: Profile update module',
            ],
          },
        ],
      },
      {
        id: 'vulnerability-details',
        title: 'Vulnerability Details',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Aplikasi menerima HTML/JS dari input bio lalu merendernya langsung ke DOM. Tanpa escaping, script dapat dieksekusi di browser korban.',
          },
        ],
      },
      {
        id: 'exploitation-steps',
        title: 'Exploitation Steps',
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: [
              'Login ke akun lab dummy.',
              'Buka halaman edit profile.',
              'Masukkan payload XSS di field bio.',
              'Simpan lalu refresh profile page.',
              'Amati payload dieksekusi saat bio dirender.',
            ],
          },
        ],
      },
      {
        id: 'proof-of-concept',
        title: 'Proof of Concept (PoC)',
        blocks: [
          {
            kind: 'code',
            language: 'html',
            code: '<img src=x onerror="alert(\'stored-xss-lab\')" />',
          },
        ],
      },
      {
        id: 'impact',
        title: 'Impact',
        blocks: [
          {
            kind: 'list',
            ordered: false,
            items: [
              'Session hijacking',
              'Defacement atau phishing pada halaman aplikasi',
              'Aksi atas nama user yang login',
            ],
          },
        ],
      },
      {
        id: 'mitigation',
        title: 'Mitigation',
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: [
              'Escape output sesuai konteks (HTML, attribute, URL, JS).',
              'Gunakan sanitizer seperti DOMPurify untuk rich text.',
              'Terapkan Content Security Policy (CSP).',
            ],
          },
        ],
      },
      {
        id: 'references',
        title: 'References',
        blocks: [
          {
            kind: 'references',
            items: [
              {
                label: 'OWASP XSS Prevention Cheat Sheet',
                href: 'https://owasp.org/www-community/xss-prevention',
              },
              {
                label: 'PortSwigger Cross-site scripting',
                href: 'https://portswigger.net/web-security/cross-site-scripting',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'idor-order-api-lab',
    title: 'IDOR on Order Detail API',
    type: 'IDOR',
    difficulty: 'Hard',
    tags: ['API', 'Authorization', 'Lab'],
    summary:
      'Endpoint order detail tidak memvalidasi ownership user. Manipulasi parameter id memungkinkan akses data order akun lain.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'IDOR (Insecure Direct Object Reference) terjadi ketika aplikasi mengekspos object identifier tanpa kontrol otorisasi yang memadai.',
          },
        ],
      },
      {
        id: 'target-info',
        title: 'Target Info',
        blocks: [
          {
            kind: 'list',
            ordered: false,
            items: [
              'Target: API lab internal (mock e-commerce)',
              'Auth: JWT untuk user session dummy',
              'Data: Sample order anonymized',
            ],
          },
        ],
      },
      {
        id: 'vulnerability-details',
        title: 'Vulnerability Details',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Backend melakukan query berdasarkan order id saja, tanpa mengecek apakah order tersebut milik user yang sedang login.',
          },
        ],
      },
      {
        id: 'exploitation-steps',
        title: 'Exploitation Steps',
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: [
              'Capture request GET order detail dari akun user A.',
              'Ubah parameter order id ke id milik user B.',
              'Kirim ulang request dengan token user A.',
              'Amati API tetap mengembalikan data order user B.',
            ],
          },
        ],
      },
      {
        id: 'proof-of-concept',
        title: 'Proof of Concept (PoC)',
        blocks: [
          {
            kind: 'code',
            language: 'http',
            code: 'GET /api/orders/8342 HTTP/1.1\\nHost: lab.local\\nAuthorization: Bearer <redacted-lab-token>',
          },
          {
            kind: 'alert',
            level: 'warning',
            text:
              'Token dan data identitas pada writeup telah disamarkan untuk menjaga keamanan dan privasi.',
          },
        ],
      },
      {
        id: 'impact',
        title: 'Impact',
        blocks: [
          {
            kind: 'list',
            ordered: false,
            items: [
              'Data leakage antar pengguna',
              'Pelanggaran privasi dan compliance',
              'Potensi fraud berbasis data order',
            ],
          },
        ],
      },
      {
        id: 'mitigation',
        title: 'Mitigation',
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: [
              'Terapkan object-level authorization di setiap endpoint.',
              'Validasi relasi object dengan user/session saat ini.',
              'Gunakan policy-based access control di service layer.',
            ],
          },
          {
            kind: 'code',
            language: 'javascript',
            code: 'const order = await Order.findByPk(orderId);\\nif (!order || order.userId !== req.user.id) {\\n  return res.status(403).json({ message: \"Forbidden\" });\\n}',
          },
        ],
      },
      {
        id: 'references',
        title: 'References',
        blocks: [
          {
            kind: 'references',
            items: [
              {
                label: 'OWASP API1:2023 Broken Object Level Authorization',
                href: 'https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/',
              },
            ],
          },
        ],
      },
    ],
  },
]

export const vulnerabilityTypes = [...new Set(vulnerabilityCases.map((item) => item.type))]
export const difficultyLevels = ['Easy', 'Medium', 'Hard']

export const allTags = [...new Set(vulnerabilityCases.flatMap((item) => item.tags))].sort((a, b) =>
  a.localeCompare(b)
)

export function findVulnerabilityBySlug(slug) {
  return vulnerabilityCases.find((item) => item.slug === slug)
}
