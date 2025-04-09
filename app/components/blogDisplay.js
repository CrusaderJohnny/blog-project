import { useState } from "react";
import blogPost from '../types/blogTypes';

export default function BlogDisplay() {
  return (
    <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{blogPost.title}</h1>
        <p className="text-sm text-gray-600">Posted on: {blogPost.date}</p>
      </header>

      <section className="leading-relaxed text-base mb-12">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue
          dolor ac augue mattis fringilla. Aenean egestas ullamcorper enim, sit
          amet ultrices tellus pellentesque quis. Sed ut consectetur quam, sed
          suscipit dui. Praesent mi nisl, pharetra at finibus vitae, tempor eu
          orci. Donec fermentum eleifend euismod. Donec lobortis massa nec
          convallis aliquam. Pellentesque porta ex vitae lorem suscipit
          venenatis.
        </p>
        <br></br>
        <p>
          Nam id arcu vel purus porttitor iaculis ac sit amet mauris. Aenean
          quis arcu in mi fermentum porta non non massa. Fusce dapibus eros sem.
          Integer vestibulum nisl eget ipsum ullamcorper, eu semper justo
          auctor. Vestibulum venenatis metus turpis, viverra facilisis arcu
          ultricies ac. Nam neque nisi, lobortis quis risus in, finibus
          convallis enim. Mauris felis erat, rutrum ut aliquam ac, imperdiet vel
          dolor. Pellentesque sed sem nec ex auctor pulvinar. Nulla condimentum
          turpis ut condimentum dictum. Maecenas diam augue, placerat eu sapien
          in, pellentesque blandit lectus. Mauris vitae mi tellus.
        </p>
        <br></br>
        <p>
          Aliquam ullamcorper eleifend dolor eget consectetur. Nulla nibh neque,
          consectetur sodales gravida eget, pulvinar ut est. Nunc ornare, justo
          ut sagittis vestibulum, ante mi gravida tellus, a convallis nibh justo
          a justo. Nulla et rutrum massa. Aliquam erat volutpat. Sed vulputate
          elit ut vestibulum gravida. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Integer eu leo at augue
          fermentum placerat blandit et lacus. In rhoncus augue feugiat nibh
          condimentum, in dapibus sem porttitor. Interdum et malesuada fames ac
          ante ipsum primis in faucibus. Vivamus pulvinar purus mollis magna
          molestie volutpat. Duis vestibulum, velit id ullamcorper bibendum,
          augue massa dignissim eros, sit amet semper tellus quam eget lacus.
          Donec non justo nunc. Vivamus pharetra scelerisque magna eget aliquet.
        </p>
        <br></br>
        <p>
          In accumsan justo ac libero vulputate, quis pretium lacus
          sollicitudin. Donec molestie fringilla metus, at tristique leo sodales
          vitae. Pellentesque eleifend sem odio, eget dignissim ante molestie
          id. Maecenas ipsum massa, facilisis eget vulputate vel, posuere in
          dui. Sed rutrum dolor eu arcu vestibulum pulvinar in nec nisl. Ut
          scelerisque, orci a ultricies imperdiet, mauris elit vulputate tortor,
          vel convallis nisi ipsum et purus. Nullam quis lorem est. Praesent
          convallis velit ut ipsum commodo accumsan. Duis odio diam, porttitor
          vel ornare sit amet, vestibulum in neque. Curabitur pulvinar urna non
          hendrerit bibendum.
        </p>
        <br></br>
        <p>
          Suspendisse tempor, nibh id mattis tincidunt, arcu metus condimentum
          nisi, eget vestibulum enim mi non neque. Mauris volutpat sapien sed
          risus facilisis auctor sed quis sem. Morbi facilisis risus nisi,
          efficitur pulvinar enim facilisis ut. Etiam convallis bibendum
          scelerisque. Proin nulla lacus, euismod nec tortor eget, commodo
          tincidunt magna. Aenean porta nisi mollis arcu laoreet, sed lacinia
          urna posuere. Proin sagittis imperdiet volutpat. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas.
        </p>
      </section>

      <footer className="text-center text-gray-500 text-sm">
        <p>♥ © § ∞</p>
      </footer>
    </article>
  );
}
