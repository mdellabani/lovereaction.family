import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
 return (
    <header>
      <div>
        <Image width={500} height={500} src="/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/label">Label</Link>
          </li>
          <li>
            <Link href="/podcasts">Podcasts</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/artists">Artists
            </Link>
          </li>
        </ul>
      </nav>
    </header>
 );
};

export default Header;
